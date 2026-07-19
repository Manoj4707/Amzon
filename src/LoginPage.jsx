import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter both email and password.')
      return
    }

    setMessage(`Welcome back, ${email}!`)
    setEmail('')
    setPassword('')

    setTimeout(() => {
      navigate('/welcome')
    }, 500)
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p>Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </main>
  )
}

export default LoginPage
