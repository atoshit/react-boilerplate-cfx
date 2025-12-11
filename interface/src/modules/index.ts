import type { FC } from 'react'
import PersonnalMenu from './personnalmenu'

export type ModuleDef = { name: string; Component: FC<any> }

export const modules: Record<string, ModuleDef> = {
  personnalmenu: { name: 'personnalmenu', Component: PersonnalMenu }
}
