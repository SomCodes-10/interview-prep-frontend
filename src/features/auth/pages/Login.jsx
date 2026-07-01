import React from 'react'
import "../auth.form.scss"
import { useState } from 'react'
import { Navigate as NavigateComponent,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    
    const {loading,user,handleLogin} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    await handleLogin({email,password})
  }

  if(loading){
    return(<main className="auth-main"><h1>Loading...</h1></main>)
  }

  if(user){
    return <NavigateComponent to={'/'} />
  }
  return (
    <main className="auth-main">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome <span className="gradient-text">Back</span></h1>
          <p className="subtitle">Continue your interview preparation where you left off.</p>
        </div>

        <form onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email" id="email" name='email' placeholder='Enter your email' />
          </div>
          <div className="input-group">
             <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password" id="password" name='password' placeholder='Enter your password' />
          </div>

          <button className='button primary-button'>Login</button>
        </form>
        
        <div className="auth-footer">
          <p>New here?<br/>Create your account and generate AI-powered interview plans and ATS-friendly resumes.</p>
          <Link to={"/register"} className="styled-link">Create Account</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
