import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function AdminSettings(){
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="System Settings" />
        <main style={{padding:20}}>
          <h2>System Settings</h2>
          <p>Manage categories, system configuration and other admin-level settings here.</p>
        </main>
      </div>
    </div>
  )
}
