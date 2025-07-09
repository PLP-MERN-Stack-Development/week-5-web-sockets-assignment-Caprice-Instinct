import { useState, useRef } from 'react'

function MessageInput({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
      handleStopTyping()
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    
    if (!isTyping) {
      setIsTyping(true)
      onTyping(true)
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 1000)
  }

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false)
      onTyping(false)
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // For demo purposes, just send file name
      onSendMessage(`📎 Shared file: ${file.name}`)
    }
  }

  return (
    <div className="message-input-container">
      <form className="message-input" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            background: 'none',
            border: '1px solid #ddd',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          📎
        </button>
        
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onBlur={handleStopTyping}
        />
        
        <button type="submit" disabled={!message.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default MessageInput