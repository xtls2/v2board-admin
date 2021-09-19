import { useState } from 'react'
import { groups } from '@/services'

export interface subModel {
  groupsState: API.Admin.GroupItem[] | undefined
  initGroupsState: () => Promise<void>
  refresh: () => Promise<void>
}

export default (): subModel => {
  const [groupsState, setGrupsState] = useState<API.Admin.GroupItem[]>()
  const [initialized, setIinitialized] = useState(false)

  const fetchGroupState = async (): Promise<API.Admin.GroupsResult | undefined> => {
    const groupsResult = await groups()
    return groupsResult
  }

  const refresh = async () => {
    const stateResult = await fetchGroupState()
    if (stateResult !== undefined) {
      setGrupsState(stateResult.data)
      setIinitialized(true)
    }
  }

  const initGroupsState = async () => {
    if (initialized === true) {
      return
    }
    refresh()
  }

  return {
    groupsState,
    initGroupsState,
    refresh,
  }
}
