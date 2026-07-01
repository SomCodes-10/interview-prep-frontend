import React, { useState } from 'react'
import "../auth.form.scss"
import { Navigate as NavigateComponent, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, user, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
  }

  if (loading) {
    return (<main className="auth-main"><h1>Loading...</h1></main>)
  }

  if(user){
    return <NavigateComponent to={'/'} />
  }

  return (
    <main className="auth-main">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Build Your <span className="gradient-text">Dream Career</span></h1>
          <p className="subtitle">Create ATS-friendly resumes, receive AI-powered interview preparation plans, identify skill gaps and prepare confidently for your dream job.</p>
        </div>

        <form onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => { setUsername(e.target.value) }}
              type="text" id="username" name='username' placeholder='Enter your username' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => { setEmail(e.target.value) }}
              type="email" id="email" name='email' placeholder='Enter your email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password" id="password" name='password' placeholder='Enter your password' />
          </div>

          <button className='button primary-button'>Register</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to={"/login"} className="styled-link">Sign In</Link>
        </div>
      </div>
    </main>
  )
}

export default Register
