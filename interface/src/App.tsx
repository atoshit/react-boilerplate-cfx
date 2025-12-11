import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { onNuiMessage, sendNui } from './lib/nui'
import { useNuiFocus } from './lib/focus'

export default function App() {
  const { focused, setFocused } = useNuiFocus(false)
  useEffect(() => {
    sendNui('react:ready')
  }, [])
  useEffect(() => {
    const offOpen = onNuiMessage('app:open', () => setFocused(true))
    const offClose = onNuiMessage('app:close', () => setFocused(false))
    return () => {
      offOpen()
      offClose()
    }
  }, [setFocused])
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-[480px] rounded-xl border border-slate-700 bg-slate-800 shadow-2xl p-6 space-y-4"
      >
        <div className="text-xl font-semibold">React NUI</div>
        <div className="text-sm text-slate-300">Focus {focused ? 'on' : 'off'}</div>
        <div className="flex gap-3">
          <button
            onClick={() => setFocused(true)}
            className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 transition"
          >
            Focus
          </button>
          <button
            onClick={() => {
              setFocused(false)
              sendNui('react:close')
            }}
            className="px-3 py-2 rounded-md bg-rose-600 hover:bg-rose-500 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}

