import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import api from '../api/axios'

export default function ManageResidents(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load(){
    setLoading(true)
    try{
      const res = await api.get('/residents')
      if(res.data && res.data.success) setItems(res.data.data)
      else setError(res.data?.message || 'Failed to load')
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  async function changeStatus(id){
    const status = prompt('Set account status (Active, Suspended, Pending):')
    if(status == null) return
    try{
      await api.patch(`/residents/${id}`, { account_status: status })
      load()
    }catch(err){ alert('Update failed: '+err?.response?.data?.message || err.message) }
  }

  async function removeResident(id){
    if(!confirm('Delete resident? This cannot be undone.')) return
    try{
      await api.delete(`/residents/${id}`)
      load()
    }catch(err){ alert('Delete failed: '+err?.response?.data?.message || err.message) }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Manage Residents" />
        <main style={{padding:20}}>
          <h2>Residents</h2>
          {error && <div className="error">{error}</div>}
          {loading ? <div>Loading...</div> : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {items.map(it=> (
                    <tr key={it.resident_id}>
                      <td>{it.resident_id}</td>
                      <td>{it.first_name} {it.last_name}</td>
                      <td>{it.email}</td>
                      <td>{it.contact_number}</td>
                      <td>{it.account_status}</td>
                      <td>
                        <button onClick={()=>changeStatus(it.resident_id)}>Change Status</button>
                        <button onClick={()=>removeResident(it.resident_id)} style={{marginLeft:8}}>Delete</button>
                      </td>
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
