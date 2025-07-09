function UserList({ users, currentUser, onStartPrivateChat, activeChat }) {
  return (
    <div>
      {users
        .filter(user => user.id !== currentUser.id)
        .map((user) => (
          <div
            key={user.id}
            className={`user-item ${activeChat === user.id ? 'active' : ''}`}
            onClick={() => onStartPrivateChat(user.id)}
            style={{
              background: activeChat === user.id ? '#34495e' : 'transparent'
            }}
          >
            <div className="user-status"></div>
            <span>{user.username}</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.8rem',
              opacity: 0.6
            }}>
              💬
            </span>
          </div>
        ))}
      
      {users.length === 1 && (
        <div style={{
          textAlign: 'center',
          opacity: 0.6,
          fontSize: '0.9rem',
          marginTop: '1rem'
        }}>
          No other users online
        </div>
      )}
    </div>
  )
}

export default UserList