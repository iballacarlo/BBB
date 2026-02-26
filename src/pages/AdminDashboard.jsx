import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import mockApi from '../api/mockApi'
import '../styles/dashboard.css'

export default function AdminDashboard(){
  const complaints = mockApi.listComplaints()
  const docs = mockApi.listDocs()
  // residents from mock storage (fallback)
  const users = JSON.parse(localStorage.getItem('mock_users') || '[]')

  const totalResidents = users.length || 0
  const totalComplaints = complaints.length || 0
  const pendingComplaints = complaints.filter(c => (c.status || '').toLowerCase().includes('pend') || (c.status || '').toLowerCase().includes('submit')).length
  const resolvedComplaints = complaints.filter(c => (c.status || '').toLowerCase().includes('resolv') || (c.status || '').toLowerCase().includes('closed')).length

  const totalDocs = docs.length || 0
  const pendingDocs = docs.filter(d => (d.status || '').toLowerCase().includes('pend') || (d.status || '').toLowerCase().includes('submit')).length
  const approvedDocs = docs.filter(d => (d.status || '').toLowerCase().includes('approved')).length
  const releasedDocs = docs.filter(d => (d.status || '').toLowerCase().includes('released')).length

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area admin-area">
        <Header title="Admin Dashboard" />
        <main>
          <div className="admin-top">
            <div className="admin-search">
              <input placeholder="Search residents, complaints, documents..." />
              <button aria-label="Search">🔍</button>
            </div>
          </div>

          <section className="stat-grid">
            <div className="stat-tile">
              <div className="stat-label">Total Residents Registered</div>
              <div className="stat-value">{totalResidents}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-label">Total Complaints Submitted</div>
              <div className="stat-value">{totalComplaints}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-label">Pending Complaints</div>
              <div className="stat-value">{pendingComplaints}</div>
            </div>

            <div className="stat-tile">
              <div className="stat-label">Resolved Complaints</div>
              <div className="stat-value">{resolvedComplaints}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-label">Total Document Requests</div>
              <div className="stat-value">{totalDocs}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-label">Pending Requests</div>
              <div className="stat-value">{pendingDocs}</div>
            </div>

            <div className="stat-tile">
              <div className="stat-label">Approved Requests</div>
              <div className="stat-value">{approvedDocs}</div>
            </div>
            <div className="stat-tile">
              <div className="stat-label">Released Documents</div>
              <div className="stat-value">{releasedDocs}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
