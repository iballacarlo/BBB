import React from 'react'
import './button.css'

export default function Button({ children, variant='primary', ...props }){
  return (
    <button className={`btn ${variant}`} {...props}>{children}</button>
  )
}
