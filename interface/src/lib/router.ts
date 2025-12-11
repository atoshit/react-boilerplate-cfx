import { useEffect, useState } from 'react'

function getPathModule(): string | null {
  const path = window.location.pathname.replace(/\/+$/, '')
  const seg = path.split('/').filter(Boolean)[0]
  if (!seg || seg === 'index.html') return null
  return seg.toLowerCase()
}

export function navigateToModule(name?: string) {
  const next = name ? `/${name}` : '/'
  window.history.pushState({}, '', next)
  window.dispatchEvent(new Event('popstate'))
}

export function usePathModule() {
  const [mod, setMod] = useState<string | null>(() => getPathModule())
  useEffect(() => {
    const onPop = () => setMod(getPathModule())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (name?: string) => {
    navigateToModule(name)
    setMod(getPathModule())
  }
  return { mod, navigate }
}

