import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import api from '../api/axios'

export default function ManageDocuments(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load(){
    setLoading(true)
    try{
      const res = await api.get('/docs')
      if(res.data && res.data.success) setItems(res.data.data)
      else setError(res.data?.message || 'Failed to load')
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  async function handleUpdate(id){
    const item = items.find(i=>i.request_id===id)
    if(!item) return
    const status = prompt('Set status (Submitted, Pending, Approved, Released):', item.status || 'Submitted')
    if(status == null) return
    try{
      await api.put(`/docs/${id}`, { status })
      load()
    }catch(err){ alert('Update failed: '+err?.response?.data?.message || err.message) }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Manage Document Requests" />
        <main style={{padding:20}}>
          <h2>Document Requests</h2>
          {error && <div className="error">{error}</div>}
          {loading ? <div>Loading...</div> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Ref</th><th>Type</th><th>Resident</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {items.map(it=> (
                    <tr key={it.request_id}>
                      <td>{it.reference_number || it.request_id}</td>
                      <td>{it.document_type || it.document}</td>
                      <td>{it.resident_id || '—'}</td>
                      <td>{new Date(it.date_requested || it.created_at || Date.now()).toLocaleDateString()}</td>
                      <td>{it.status}</td>
                      <td><button onClick={()=>handleUpdate(it.request_id)}>Change Status</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
