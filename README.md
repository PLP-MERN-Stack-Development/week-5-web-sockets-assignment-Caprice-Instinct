# Real-Time Chat Application with Socket.io

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19913705&assignment_repo_type=AssignmentRepo)

A fully-featured real-time chat application built with Socket.io, React, and Express.js. This application demonstrates bidirectional communication between clients and server with advanced features like private messaging, typing indicators, message reactions, and file sharing.

## 🚀 Features Implemented

### Core Chat Functionality
- ✅ Real-time messaging using Socket.io
- ✅ User authentication (username-based)
- ✅ Global chat room for all users
- ✅ Message display with sender name and timestamp
- ✅ Online/offline status indicators
- ✅ User join/leave notifications

### Advanced Features
- ✅ **Private Messaging**: Direct messages between users
- ✅ **Typing Indicators**: Shows when users are composing messages
- ✅ **Message Reactions**: Like, love, laugh, and other emoji reactions
- ✅ **File Sharing**: Upload and share files with other users
- ✅ **Message Delivery Acknowledgments**: Confirmation when messages are sent
- ✅ **Read Receipts**: See when messages have been read
- ✅ **Multiple Chat Rooms**: General, Random, and Tech Talk rooms

### Real-Time Notifications
- ✅ Browser notifications for new messages
- ✅ Sound notifications (visual indicators)
- ✅ User join/leave notifications
- ✅ Unread message indicators
- ✅ Connection status notifications

### Performance & UX Optimizations
- ✅ **Message Pagination**: Efficient loading of message history
- ✅ **Auto-reconnection**: Handles network disconnections gracefully
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Message Search**: Search through chat history
- ✅ **Optimized Socket.io**: Uses rooms and namespaces for performance

## 🛠️ Technology Stack

**Frontend:**
- React 18 with Vite
- Socket.io Client
- CSS3 with responsive design
- Web Notifications API

**Backend:**
- Node.js with Express
- Socket.io Server
- Multer for file uploads
- CORS enabled

## 📁 Project Structure

```
socketio-chat/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Chat.jsx    # Main chat interface
│   │   │   ├── Login.jsx   # User authentication
│   │   │   ├── Message.jsx # Individual message component
│   │   │   ├── MessageList.jsx # Message container
│   │   │   ├── MessageInput.jsx # Message input with file upload
│   │   │   └── UserList.jsx # Online users sidebar
│   │   ├── socket/         # Socket.io client setup
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── uploads/            # File upload storage
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd week-5-web-sockets-assignment-Caprice-Instinct
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the development servers:**
   
   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - Enter a username to join the chat

## 🎯 How to Use

1. **Join the Chat**: Enter your username on the login screen
2. **Send Messages**: Type in the message input and press Enter or click Send
3. **Private Messages**: Click on any user in the sidebar to start a private chat
4. **File Sharing**: Click the 📎 button to upload and share files
5. **Message Reactions**: Click the + button on any message to add reactions
6. **Switch Rooms**: Click on different room names in the sidebar

## 🔧 API Endpoints

- `GET /api/messages?page=1&limit=50` - Get paginated messages
- `GET /api/users` - Get list of online users
- `GET /api/rooms` - Get available chat rooms
- `POST /api/upload` - Upload files
- `GET /api/search?q=query` - Search messages

## 🌐 Socket Events

**Client to Server:**
- `user_join` - User joins the chat
- `send_message` - Send a message
- `private_message` - Send private message
- `typing` - Typing indicator
- `message_reaction` - Add reaction to message
- `mark_read` - Mark message as read

**Server to Client:**
- `user_list` - Updated user list
- `receive_message` - New message received
- `private_message` - Private message received
- `typing_users` - Users currently typing
- `user_joined` - User joined notification
- `user_left` - User left notification

## 📱 Screenshots

*Note: Add screenshots of your working application here*

## 🚀 Deployment

### Server Deployment (Railway/Render/Heroku)
1. Create account on your preferred platform
2. Connect your GitHub repository
3. Set environment variables:
   - `PORT=5000`
   - `CLIENT_URL=https://your-client-url.com`
4. Deploy the server folder

### Client Deployment (Vercel/Netlify)
1. Create account on your preferred platform
2. Connect your GitHub repository
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variable:
   - `VITE_SOCKET_URL=https://your-server-url.com`
5. Deploy the client folder

## 🤝 Contributing

This is a school assignment, but feel free to fork and improve upon it!

## 📄 License

This project is for educational purposes.

## 🔗 Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)