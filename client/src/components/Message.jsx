import { useState } from 'react'

function Message({ message, isOwn, currentUser, reactions, onReaction }) {
  const [showReactions, setShowReactions] = useState(false)

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡']

  if (message.system) {
    return (
      <div className="message system">
        {message.message}
      </div>
    )
  }

  return (
    <div className={`message ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && (
        <div className="message-header">
          {message.sender}
          {message.isPrivate && <span style={{color: '#e74c3c'}}> (Private)</span>}
        </div>
      )}
      
      <div className="message-content">
        {message.message}
      </div>
      
      <div className="message-time">
        {formatTime(message.timestamp)}
        {message.isPrivate && isOwn && <span> ✓</span>}
      </div>

      {/* Reactions */}
      <div className="message-reactions">
        {reactions && Object.entries(reactions).map(([emoji, count]) => (
          <span key={emoji} className="reaction" onClick={() => onReaction(emoji)}>
            {emoji} {count}
          </span>
        ))}
        
        <button 
          className="reaction-btn"
          onClick={() => setShowReactions(!showReactions)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            opacity: 0.6
          }}
        >
          +
        </button>
        
        {showReactions && (
          <div className="reaction-picker" style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '0.5rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 100
          }}>
            {reactionEmojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => {
                  onReaction(emoji)
                  setShowReactions(false)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  margin: '0 0.2rem'
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Message