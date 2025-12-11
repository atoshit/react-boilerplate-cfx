import { useEffect, useState } from 'react'
import { onNuiMessage, sendNui, isNuiEnv } from './lib/nui'
import { useNuiFocus } from './lib/focus'
import { modules } from './modules'
import { usePathModule, navigateToModule } from './lib/router'

export default function App() {
  const { focused, setFocused } = useNuiFocus(false)
  const [active, setActive] = useState<{ name: string; data?: any } | null>(null)
  const { mod: pathMod, navigate } = usePathModule()
  useEffect(() => {
    sendNui('react:ready')
  }, [])
  useEffect(() => {
    if (!isNuiEnv && pathMod && modules[pathMod]) {
      setActive({ name: pathMod })
      setFocused(true)
    }
  }, [pathMod])
  useEffect(() => {
    const offOpen = onNuiMessage('app:open', () => setFocused(true))
    const offClose = onNuiMessage('app:close', () => setFocused(false))
    const offModule = onNuiMessage('module:open', (p: { name: string; data?: any }) => {
      setActive({ name: p?.name, data: p?.data })
      setFocused(true)
      if (!isNuiEnv) navigateToModule(p?.name)
    })
    return () => {
      offOpen()
      offClose()
      offModule()
    }
  }, [setFocused])
  const mod = active ? modules[active.name] : null
  const isDev = import.meta.env.DEV && !isNuiEnv
  const [bgMode, setBgMode] = useState<'night' | 'day'>('night')
  const bgNight = isDev ? (import.meta.env.VITE_DEV_BG_NIGHT || '/background_night.png') : null
  const bgDay = isDev ? (import.meta.env.VITE_DEV_BG_DAY || '/background_day.png') : null
  const bg = isDev ? (bgMode === 'night' ? bgNight : bgDay) : null
  useEffect(() => {
    if (!isDev) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'n') setBgMode('night')
      if (e.key.toLowerCase() === 'j') setBgMode('day')
      if (e.key.toLowerCase() === 't') setBgMode(m => (m === 'night' ? 'day' : 'night'))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isDev])
  if (!isDev && !mod) return null
  return (
    <div className="min-h-screen">
      {isDev && (
        <div className="fixed inset-0 z-0" onClick={() => setBgMode(m => (m === 'night' ? 'day' : 'night'))}>
          <div className="w-full h-full bg-center bg-cover cursor-pointer" style={{ backgroundImage: `url('${bg}')` }} />
        </div>
      )}
      {mod && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <mod.Component {...(active?.data || {})} />
        </div>
      )}
    </div>
  )
}
