import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext()

export function SettingsProvider({ children }){
  const [dark, setDark] = useState(false)
  const [contrast, setContrast] = useState(false)
  const [fontSize, setFontSize] = useState('medium')
  const [tts, setTts] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem('settings') || '{}')
    if(s.dark) setDark(true)
    if(s.contrast) setContrast(true)
    if(s.fontSize) setFontSize(s.fontSize)
    if(s.tts) setTts(true)
    if(s.screenReader) setScreenReader(true)
  },[])

  useEffect(()=>{
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.dataset.contrast = contrast ? 'high' : 'normal'
    document.documentElement.dataset.font = fontSize
    localStorage.setItem('settings', JSON.stringify({ dark, contrast, fontSize, tts, screenReader }))
  },[dark,contrast,fontSize])

  useEffect(()=>{
    if(tts){
      // placeholder: speak welcome when TTS enabled
      if(window.speechSynthesis){
        const msg = new SpeechSynthesisUtterance('Accessibility: Text to speech enabled')
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(msg)
      }
    }
  },[tts])

  return (
    <SettingsContext.Provider value={{ dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, screenReader, setScreenReader }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(){
  return useContext(SettingsContext)
}
