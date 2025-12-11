import { motion } from 'framer-motion'
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
  if (!mod) return null
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="w-[640px] rounded-xl border border-slate-700 bg-slate-800 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">React NUI</div>
          <div className="flex gap-2">
            <div className="text-xs px-2 py-1 rounded bg-slate-700">{focused ? 'Focus' : 'No focus'}</div>
            <button onClick={() => { setActive(null); setFocused(false); sendNui('react:close') }} className="px-2 py-1 rounded-md bg-rose-600 hover:bg-rose-500 transition">Close</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-slate-300">Module: {mod.name}</div>
          <mod.Component {...(active?.data || {})} />
        </div>
      </motion.div>
    </div>
  )
}
