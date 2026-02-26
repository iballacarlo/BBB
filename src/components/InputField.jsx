import React, { useState } from 'react'
import './inputfield.css'

export default function InputField({ label, type='text', error, ...props }){
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      {label && <label>{label}</label>}
      <div className="input-wrap">
        <input type={isPassword && show ? 'text' : type} {...props} />
        {isPassword && (
          <button type="button" className="showbtn" onClick={() => setShow(s => !s)} aria-label="Toggle password visibility">{show ? 'Hide' : 'Show'}</button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}
