import { useState, useEffect } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'
import { useSocket } from './socket/socket'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const { isConnected, lastMessage } = useSocket()

  // Show notifications for new messages
  useEffect(() => {
    if (lastMessage && user && lastMessage.senderId !== user.id) {
      setNotification(`New message from ${lastMessage.sender}`)
      
      // Browser notification
      if (Notification.permission === 'granted') {
        new Notification(`New message from ${lastMessage.sender}`, {
          body: lastMessage.message,
          icon: '/chat-icon.png'
        })
      }
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000)
    }
  }, [lastMessage, user])

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <Chat user={user} onLogout={() => setUser(null)} />
      )}
      
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      {!isConnected && user && (
        <div className="notification" style={{background: '#e74c3c'}}>
          Disconnected - Attempting to reconnect...
        </div>
      )}
    </div>
  )
}

export default App