import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useSettings } from '../context/SettingsContext'
import Button from '../components/Button'

export default function AccessibilitySettings(){
  const { dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, screenReader, setScreenReader } = useSettings()

  function reset(){
    setDark(false); setContrast(false); setFontSize('medium'); setTts(false); setScreenReader(false)
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title="Accessibility Settings" />
        <main>
          <div className="settings-card card" style={{maxWidth:720}}>
            <div style={{display:'grid',gap:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div>Dark Mode</div><input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} /></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div>Text-to-Speech</div><input type="checkbox" checked={tts} onChange={e=>setTts(e.target.checked)} /></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div>High Contrast</div><input type="checkbox" checked={contrast} onChange={e=>setContrast(e.target.checked)} /></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div>Screen Reader</div><input type="checkbox" checked={screenReader} onChange={e=>setScreenReader(e.target.checked)} /></div>

              <div>
                <div style={{marginBottom:8}}>Font Size</div>
                <div style={{display:'flex',gap:8}}>
                  <button className={fontSize==='small'? 'btn secondary active' : 'btn secondary'} onClick={()=>setFontSize('small')}>S</button>
                  <button className={fontSize==='medium'? 'btn secondary active' : 'btn secondary'} onClick={()=>setFontSize('medium')}>M</button>
                  <button className={fontSize==='large'? 'btn secondary active' : 'btn secondary'} onClick={()=>setFontSize('large')}>L</button>
                  <button className={fontSize==='xlarge'? 'btn secondary active' : 'btn secondary'} onClick={()=>setFontSize('xlarge')}>XL</button>
                </div>
              </div>

              <div style={{display:'flex',gap:12}}>
                <Button variant="secondary" onClick={reset}>Reset to Default</Button>
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
