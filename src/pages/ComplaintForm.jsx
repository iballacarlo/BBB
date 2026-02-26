import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Button from '../components/Button'
import InputField from '../components/InputField'
import '../styles/form.css'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function ComplaintForm(){
  const [form, setForm] = useState({ category:'', title:'', description:'', location:'', image: null })
  const [errors, setErrors] = useState({})
  const nav = useNavigate()

  function validate(){
    const e = {}
    if(!form.category) e.category = 'Category required'
    if(!form.title) e.title = 'Title required'
    if(!form.description) e.description = 'Description required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!validate()) return
    try {
      const res = await api.post('/complaints', form)
      if(res.data.success) nav('/complaint-history')
      else alert('Error: ' + res.data.message)
    } catch(err){
      alert('Error submitting complaint: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Submit Complaint" />
        <main>
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <div className="complaint-grid">
              <div className="label-column">
                <label>Category</label>
                <label>Title</label>
                <label>Description</label>
                <label>Location</label>
                <label>Date</label>
                <label>Upload Image/Video</label>
                <label>Anonymous</label>
              </div>
              <div className="field-column">
                <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="">Select Category</option>
                  <option>Noise</option>
                  <option>Garbage</option>
                  <option>Traffic</option>
                </select>
                {errors.category && <div className="error">{errors.category}</div>}

                <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />

                <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
                {errors.description && <div className="error">{errors.description}</div>}

                <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />

                <div className="date-row">
                  <input placeholder="MM" style={{width:64}} />
                  <input placeholder="DD" style={{width:64}} />
                  <input placeholder="YYYY" style={{width:96}} />
                </div>

                <div className="upload-row">
                  <input type="file" accept="image/*,video/*" onChange={e=>setForm({...form, image: e.target.files[0]})} />
                </div>

                <div style={{marginTop:8}}>
                  <label style={{display:'inline-flex',alignItems:'center',gap:8}}><input type="checkbox" /> Submit anonymously</label>
                </div>

                <div className="submit-right" style={{marginTop:20}}>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
