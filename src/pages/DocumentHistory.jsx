import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import '../styles/history.css'
import api from '../api/axios'

export default function DocumentHistory(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/docs')
      .then(res => { if(res.data.success) setData(res.data.data || []); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if(loading) return <div className="app-shell"><div className="main-area"><main>Loading...</main></div></div>
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Document History" />
        <main>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Ref</th><th>Type</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {data.map(d=> (
                  <tr key={d.request_id}><td>{d.reference_number}</td><td>{d.document_type}</td><td>{new Date(d.date_requested).toLocaleDateString()}</td><td>{d.status}</td><td><button>Download</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
