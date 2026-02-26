import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function AdminReports(){
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Reports & Analytics" />
        <main style={{padding:20}}>
          <p>Placeholder: reports and charts will be shown here.</p>
        </main>
      </div>
    </div>
  )
}
