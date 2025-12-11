type NuiMessage = { action: string; payload?: any }

export const isNuiEnv = !!(window as any).GetParentResourceName
const resourceName = isNuiEnv
  ? (window as any).GetParentResourceName()
  : 'react-boilerplate-cfx'

export function sendNui<T = any>(event: string, data?: any): Promise<T> {
  return fetch(`https://${resourceName}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data || {})
  }).then(r => r.json())
}

type Handler = (payload: any) => void
const handlers = new Map<string, Set<Handler>>()

export function onNuiMessage(action: string, handler: Handler): () => void {
  if (!handlers.has(action)) handlers.set(action, new Set())
  handlers.get(action)!.add(handler)
  return () => handlers.get(action)!.delete(handler)
}

window.addEventListener('message', e => {
  const msg = e.data as NuiMessage
  if (!msg || typeof msg !== 'object') return
  const set = handlers.get(msg.action)
  if (!set) return
  set.forEach(h => h(msg.payload))
})
