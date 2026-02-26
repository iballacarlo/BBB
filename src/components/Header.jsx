import React from 'react'
import { useSettings } from '../context/SettingsContext'
import './header.css'
import Logo from '../assets/Bacoor.png'

export default function Header({ title }){
  const { dark, setDark, contrast, setContrast } = useSettings()
  return (
    <header className="top-header">
      <div className="top-left">
        <img src={Logo} alt="Barangay logo" className="logo-small" />
        <div className="barangay-name">Name of the Barangay</div>
      </div>
      <div className="top-middle"><h1>{title}</h1></div>
      <div className="top-right">
        <div className="header-controls">
          <button onClick={() => setDark(!dark)} aria-pressed={dark} className="small">{dark ? 'Dark' : 'Light'}</button>
          <button onClick={() => setContrast(!contrast)} aria-pressed={contrast} className="small">{contrast ? 'HighC' : 'Contrast'}</button>
        </div>
        <div className="avatar" aria-hidden>👤</div>
      </div>
    </header>
  )
}
