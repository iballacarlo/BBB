import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import '../styles/dashboard.css'

export default function Dashboard(){
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Dashboard" />
        <main>
          <section className="cards">
            <Card title="Total Complaints" value={42} />
            <Card title="Active Complaints" value={7} />
            <Card title="Total Document Requests" value={18} />
            <Card title="Pending Requests" value={3} />
          </section>
          <section className="recent">
            <h2>Recent Activity</h2>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Ref</th><th>Category</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td>BRG-2026-001</td>
                    <td>Noise</td>
                    <td>2026-02-18</td>
                    <td><StatusBadge status="Pending"/></td>
                    <td><button>View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
