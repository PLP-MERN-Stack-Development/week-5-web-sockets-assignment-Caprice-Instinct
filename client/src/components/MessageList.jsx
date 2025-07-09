import { useState } from 'react'
import Message from './Message'

function MessageList({ messages, currentUser, typingUsers }) {
  const [reactions, setReactions] = useState({})

  const handleReaction = (messageId, reaction) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        [reaction]: (prev[messageId]?.[reaction] || 0) + 1
      }
    }))
  }

  return (
    <div>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isOwn={message.senderId === currentUser.id}
          currentUser={currentUser}
          reactions={reactions[message.id]}
          onReaction={(reaction) => handleReaction(message.id, reaction)}
        />
      ))}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </div>
      )}
    </div>
  )
}

export default MessageList