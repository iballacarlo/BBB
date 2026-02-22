import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Button from '../components/Button'
import '../styles/form.css'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function DocumentRequest(){
  const [type, setType] = useState('Barangay Clearance')
  const [businessName, setBusinessName] = useState('')
  const [purpose, setPurpose] = useState('')
  const nav = useNavigate()

  const autofill = { name: 'Juan Dela Cruz', birthdate: '1990-01-01', address: '123 Barangay St.' }

  async function handle(){
    try {
      const res = await api.post('/docs', { document_type: type, business_name: businessName, purpose })
      if(res.data.success) nav('/document-history')
      else alert('Error: ' + res.data.message)
    } catch(err){
      alert('Error submitting request: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Document Request" />
        <main>
          <section className="card request-card">
            <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:20}}>
              <div className="label-column">
                <label>Name</label>
                <label>Birthdate</label>
                <label>Address</label>
                <label>Document Type</label>
                <label>Purpose</label>
              </div>
              <div className="field-column">
                <input value={autofill.name} readOnly />
                <input value={autofill.birthdate} readOnly />
                <input value={autofill.address} readOnly />
                <select value={type} onChange={e=>setType(e.target.value)}>
                  <option>Barangay Clearance</option>
                  <option>Business Permit</option>
                  <option>Indigency Certification</option>
                </select>
                {type === 'Business Permit' && (
                  <input value={businessName} onChange={e=>setBusinessName(e.target.value)} />
                )}
                <textarea value={purpose} onChange={e=>setPurpose(e.target.value)} />
                <div style={{display:'flex',gap:12,justifyContent:'flex-end',marginTop:6}}>
                  <button title="Scan QR" style={{padding:'8px 10px'}}>Scan QR</button>
                  <Button onClick={handle}>Submit</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
