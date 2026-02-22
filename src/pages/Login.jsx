import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useSettings } from '../context/SettingsContext'
import '../styles/login.css'
import Logo from '../assets/Bacoor.png'

export default function Login(){
  const navigate = useNavigate()
  const { setFontSize, setContrast } = useSettings()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  function validate(){
    const e = {}
    if(!email) e.email = 'Email is required'
    if(!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleLogin(e){
    e.preventDefault()
    if(!validate()) return
    const res = await login(email, password)
    if(res.ok){
      // redirect based on role
      const role = res.role || (await (await fetch('/me')).json())?.role
      if(role === 'staff' || role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    } else setErrors({ form: res.message })
  }

  return (
    <div className="login-page">
      <form className="login-card wide" onSubmit={handleLogin} aria-labelledby="loginTitle">
        <div className="login-top">
          <img src="/src/assets/Bacoor.png" onError={(e)=>{e.target.onerror=null; e.target.src=Logo}} alt="Barangay logo" className="logo" />
          <h2 id="loginTitle">Barangay Service & Complaint Management System</h2>
          <div className="settings-gear" aria-hidden>⚙️</div>
        </div>

        <div className="login-body">
          <h3>Login</h3>
          <InputField label="Email" value={email} onChange={e=>setEmail(e.target.value)} error={errors.email} />
          <InputField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} error={errors.password} />

          <div className="login-row">
            <label className="remember"><input type="checkbox" /> Remember me</label>
            <div className="login-actions">
              <a href="#" className="muted">Forgot Password?</a>
              <Button type="submit">Login</Button>
            </div>
          </div>

          {errors.form && <div className="error">{errors.form}</div>}
          <p className="muted">Don't have an account? <Link to="/register">Register</Link></p>
        </div>

        <div className="access-row">
          <label>High contrast <input type="checkbox" onChange={e=>setContrast(e.target.checked)} /></label>
        </div>
      </form>
    </div>
  )
}
