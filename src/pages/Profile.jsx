import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Profile(){
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Profile" />
        <main>
          <div className="card">
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} />
            <label>Email</label>
            <input value={user?.email || ''} readOnly />
            <div className="row" style={{marginTop:12}}>
              <Button>Save</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
