import type { FC } from 'react'
import Dashboard from './dashboard'
import Auth from './auth'

export type ModuleDef = { name: string; Component: FC<any> }

export const modules: Record<string, ModuleDef> = {
  dashboard: { name: 'dashboard', Component: Dashboard },
  auth: { name: 'auth', Component: Auth }
}

