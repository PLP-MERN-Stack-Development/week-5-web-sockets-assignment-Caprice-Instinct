// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type']
  },
  allowEIO3: true
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Store connected users, messages, and rooms
const users = {};
const messages = [];
const typingUsers = {};
const rooms = {
  general: { name: 'General', users: [], messages: [] },
  random: { name: 'Random', users: [], messages: [] },
  tech: { name: 'Tech Talk', users: [], messages: [] }
};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);
  
  socket.on('disconnect', (reason) => {
    console.log(`❌ User disconnected: ${socket.id}, reason: ${reason}`);
  });
  
  socket.on('error', (error) => {
    console.error(`🔥 Socket error for ${socket.id}:`, error);
  });

  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { 
      username, 
      id: socket.id, 
      joinedAt: new Date().toISOString(),
      status: 'online'
    };
    
    // Join general room by default
    socket.join('general');
    rooms.general.users.push(socket.id);
    
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // Handle joining rooms
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    if (rooms[roomName]) {
      rooms[roomName].users.push(socket.id);
    }
  });

  // Handle leaving rooms
  socket.on('leave_room', (roomName) => {
    socket.leave(roomName);
    if (rooms[roomName]) {
      rooms[roomName].users = rooms[roomName].users.filter(id => id !== socket.id);
    }
  });

  // Handle chat messages with acknowledgment
  socket.on('send_message', (messageData, callback) => {
    const message = {
      ...messageData,
      id: Date.now() + Math.random(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      delivered: true,
      read: false
    };
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 1000) {
      messages.shift();
    }
    
    io.emit('receive_message', message);
    
    // Send acknowledgment
    if (callback) callback({ status: 'delivered', messageId: message.id });
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      socket.broadcast.emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: Date.now() + Math.random(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
      delivered: true,
      read: false
    };
    
    messages.push(messageData);
    
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // Handle message reactions
  socket.on('message_reaction', ({ messageId, reaction }) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      if (!message.reactions) message.reactions = {};
      if (!message.reactions[reaction]) message.reactions[reaction] = [];
      
      const userId = socket.id;
      if (!message.reactions[reaction].includes(userId)) {
        message.reactions[reaction].push(userId);
        io.emit('reaction_updated', { messageId, reactions: message.reactions });
      }
    }
  });

  // Handle message read receipts
  socket.on('mark_read', (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (message && message.senderId !== socket.id) {
      message.read = true;
      io.to(message.senderId).emit('message_read', { messageId, readBy: socket.id });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
      
      // Remove from all rooms
      Object.keys(rooms).forEach(roomName => {
        rooms[roomName].users = rooms[roomName].users.filter(id => id !== socket.id);
      });
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedMessages = messages.slice(startIndex, endIndex);
  
  res.json({
    messages: paginatedMessages,
    totalMessages: messages.length,
    currentPage: page,
    totalPages: Math.ceil(messages.length / limit)
  });
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`
  });
});

// Search messages
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }
  
  const searchResults = messages.filter(message => 
    message.message.toLowerCase().includes(query.toLowerCase()) ||
    message.sender.toLowerCase().includes(query.toLowerCase())
  );
  
  res.json(searchResults);
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; 