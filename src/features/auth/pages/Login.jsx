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
    return(<main><h1>Loading...</h1></main>)
  }

  if(user){
    return <NavigateComponent to={'/'} />
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

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
          <p>Do not have an account?<Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
