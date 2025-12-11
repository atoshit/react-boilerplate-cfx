import { useEffect, useState } from 'react'
import { sendNui } from './nui'

export function useNuiFocus(initial = false) {
  const [focused, setFocused] = useState(initial)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!focused) return
      if (e.key === 'Escape') {
        sendNui('react:close')
        setFocused(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focused])
  useEffect(() => {
    sendNui('react:setFocus', { state: focused, cursor: focused })
  }, [focused])
  return { focused, setFocused }
}

