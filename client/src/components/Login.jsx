import { useState } from 'react'
import { useSocket } from '../socket/socket'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const { connect } = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      setLoading(true)
      connect(username.trim())
      onLogin({ username: username.trim(), id: Date.now() })
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Join Chat</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn" disabled={loading || !username.trim()}>
          {loading ? 'Joining...' : 'Join Chat'}
        </button>
      </form>
    </div>
  )
}

export default Login