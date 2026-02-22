import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import '../styles/login.css'

export default function Register(){
  const { register } = useAuth()
  const [form, setForm] = useState({ first:'', middle:'', last:'', suffix:'', gender:'', email:'', password:'', confirm:'' })
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function handle(e){
    e.preventDefault()
    setErr('')
    if(form.password !== form.confirm){ setErr('Passwords do not match'); return }
    const res = await register({ name: form.first + ' ' + (form.middle||'') + ' ' + form.last, email: form.email, password: form.password })
    if(res.ok) navigate('/dashboard')
    else setErr(res.message)
  }

  return (
    <div className="login-page">
      <form className="login-card wide" onSubmit={handle}>
        <div className="login-top">
          <img src="/src/assets/Bacoor.png" onError={(e)=>{e.target.onerror=null; e.target.src='/src/assets/Bacoor.png'}} alt="Barangay logo" className="logo" />
          <h2>Register</h2>
        </div>

        <div className="register-grid">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <div>
              <label>First Name</label>
              <input value={form.first} onChange={e=>setForm({...form,first:e.target.value})} />
            </div>
            <div>
              <label>Middle Name</label>
              <input value={form.middle} onChange={e=>setForm({...form,middle:e.target.value})} />
            </div>
            <div>
              <label>Last Name</label>
              <input value={form.last} onChange={e=>setForm({...form,last:e.target.value})} />
            </div>
            <div>
              <label>Suffix</label>
              <input value={form.suffix} onChange={e=>setForm({...form,suffix:e.target.value})} />
            </div>
            <div>
              <label>Gender</label>
              <input value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} />
            </div>
          </div>

          <div>
            <label>Email</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:'100%'}} />

            <label style={{marginTop:12}}>Password</label>
            <div style={{position:'relative'}}>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:'100%',paddingRight:44}} />
              <button type="button" className="showbtn" aria-label="Toggle password visibility">👁️</button>
            </div>

            <label style={{marginTop:12}}>Confirm Password</label>
            <div style={{position:'relative'}}>
              <input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} style={{width:'100%',paddingRight:44}} />
              <button type="button" className="showbtn" aria-label="Toggle password visibility">👁️</button>
            </div>

            {err && <div className="error">{err}</div>}

            <div style={{display:'flex', justifyContent:'flex-end', marginTop:16}}>
              <Button type="submit">Register</Button>
            </div>

            <p className="muted" style={{marginTop:12}}>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}
