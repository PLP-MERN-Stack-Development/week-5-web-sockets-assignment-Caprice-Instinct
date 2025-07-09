import { useState, useEffect, useRef } from 'react'
import { useSocket } from '../socket/socket'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import UserList from './UserList'

function Chat({ user, onLogout }) {
  const [currentRoom, setCurrentRoom] = useState('general')
  const [privateChats, setPrivateChats] = useState({})
  const [activeChat, setActiveChat] = useState('general')
  const messagesEndRef = useRef(null)
  
  const { 
    messages, 
    users, 
    typingUsers, 
    sendMessage, 
    sendPrivateMessage, 
    setTyping,
    disconnect 
  } = useSocket()

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (message) => {
    if (activeChat === 'general') {
      sendMessage(message)
    } else {
      sendPrivateMessage(activeChat, message)
    }
  }

  const handleLogout = () => {
    disconnect()
    onLogout()
  }

  const startPrivateChat = (userId) => {
    setActiveChat(userId)
    setPrivateChats(prev => ({
      ...prev,
      [userId]: []
    }))
  }

  const filteredMessages = activeChat === 'general' 
    ? messages.filter(msg => !msg.isPrivate)
    : messages.filter(msg => 
        msg.isPrivate && 
        (msg.senderId === activeChat || msg.senderId === user.id)
      )

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Chat Rooms</h3>
          <button onClick={handleLogout} className="btn" style={{marginTop: '1rem', padding: '0.5rem'}}>
            Logout
          </button>
        </div>
        
        <div className="user-list">
          <div 
            className={`user-item ${activeChat === 'general' ? 'active' : ''}`}
            onClick={() => setActiveChat('general')}
            style={{background: activeChat === 'general' ? '#34495e' : 'transparent'}}
          >
            <div className="user-status"></div>
            General Chat
          </div>
          
          <h4 style={{margin: '1rem 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.8}}>
            Online Users ({users.length})
          </h4>
          
          <UserList 
            users={users} 
            currentUser={user}
            onStartPrivateChat={startPrivateChat}
            activeChat={activeChat}
          />
        </div>
      </div>

      <div className="main-chat">
        <div className="chat-header">
          <h3>
            {activeChat === 'general' 
              ? 'General Chat' 
              : `Private chat with ${users.find(u => u.id === activeChat)?.username || 'User'}`
            }
          </h3>
          <div style={{fontSize: '0.9rem', color: '#666'}}>
            {users.length} users online
          </div>
        </div>

        <div className="messages-container">
          <MessageList 
            messages={filteredMessages}
            currentUser={user}
            typingUsers={typingUsers}
          />
          <div ref={messagesEndRef} />
        </div>

        <MessageInput 
          onSendMessage={handleSendMessage}
          onTyping={setTyping}
        />
      </div>
    </div>
  )
}

export default Chat