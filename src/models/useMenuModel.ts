import { useState } from 'react'
import { getIntl } from 'umi'

export interface MenuValue {
  name: string
  path: string
  icon: string
}

export type Menus = {
  data: Record<string, MenuValue>
  getPath: (index: string) => string
  getIcon: (index: string) => string
  getName: (index: string) => string
  getIndex: (path: string) => string | undefined
  testIndex: (index: string, path: string) => boolean
}

export const menus: Menus = {
  data: {
    '0': {
      name: 'module.dashboard',
      path: '/dashboard',
      icon: 'speedometer',
    },
    '1': {
      name: 'module.config.system',
      path: '/config/system',
      icon: 'equalizer',
    },
    '2': {
      name: 'module.config.payment',
      path: '/config/payment',
      icon: 'credit-card',
    },
    '3': {
      name: 'module.server.manage',
      path: '/server/manage',
      icon: 'layers',
    },
    '4': {
      name: 'module.server.group',
      path: '/server/group',
      icon: 'wrench',
    },
    '5': {
      name: 'module.plan',
      path: '/plan',
      icon: 'bag',
    },
    '6': {
      name: 'module.order',
      path: '/order',
      icon: 'list',
    },
    '7': {
      name: 'module.coupon',
      path: '/coupon',
      icon: 'present',
    },
    '8': {
      name: 'module.user',
      path: '/user',
      icon: 'users',
    },
    '9': {
      name: 'module.notice',
      path: '/notice',
      icon: 'speech',
    },
    '10': {
      name: 'module.ticket',
      path: '/ticket',
      icon: 'support',
    },
    '11': {
      name: 'module.knowledge',
      path: '/knowledge',
      icon: 'bulb',
    },
  },
  getPath: (index: string): string => {
    return menus.data[index] ? menus.data[index].path : ''
  },
  getIcon: (index: string): string => {
    return menus.data[index] ? menus.data[index].icon : ''
  },
  getName: (index: string): string => {
    return menus.data[index] ? getIntl().formatMessage({ id: menus.data[index].name }) : ''
  },
  getIndex: (path: string): string => {
    let index = ''
    Object.keys(menus.data).forEach((key) => {
      if (menus.data[key] && menus.data[key].path === path) {
        index = key
      }
      return menus.data[key]
    })
    return index
  },
  testIndex: (index: string, path: string): boolean => {
    if (menus.data[index] !== undefined) {
      return false
    }
    return menus.data[index].path === path
  },
}

export interface MenuModel {
  menuIndex: string
  menuName: string
  menus: Menus
  setMenuIndex: React.Dispatch<React.SetStateAction<string>>
  setMenuName: React.Dispatch<React.SetStateAction<string>>
}

export default (): MenuModel => {
  const [menuIndex, setMenuIndex] = useState('0')
  const [menuName, setMenuName] = useState('')

  return {
    menus,
    menuIndex,
    menuName,
    setMenuName,
    setMenuIndex,
  }
}
