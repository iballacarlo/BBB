import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'
import '../styles/history.css'
import api from '../api/axios'

export default function ComplaintHistory(){
  const [filter, setFilter] = useState('All')
  const [q, setQ] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/complaints')
      .then(res => { if(res.data.success) setData(res.data.data || []); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const list = data.filter(item => (filter==='All' || item.status===filter) && (q==='' || item.complaint_id?.toString().includes(q) || item.title?.includes(q)))

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Complaint History" />
        <main>
          <div className="controls">
            <select value={filter} onChange={e=>setFilter(e.target.value)}>
              <option>All</option>
              <option>Resolved</option>
              <option>Pending</option>
            </select>
            <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Category</th><th>Date</th><th>Status</th><th>View</th></tr></thead>
              <tbody>
                {list.map(r=> (
                  <tr key={r.complaint_id}><td>C-{r.complaint_id}</td><td>{r.category_id}</td><td>{new Date(r.date_submitted).toLocaleDateString()}</td><td><StatusBadge status={r.status}/></td><td><button>View</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
