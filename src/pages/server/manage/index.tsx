import type { FC, ChangeEvent } from 'react'
import { useIntl } from 'umi'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Dropdown, Menu, Tag, message } from 'antd'
import List from './_List'
import lodash from 'lodash'
import { useEffect, useState } from 'react'
import { nodes, nodeSort } from '@/services'
import { useDebounceFn, useMount } from 'ahooks'
import DrawerShadowsocks from './_Drawer/shadowsocks'
import DrawerV2ray from './_Drawer/v2ray'
import DrawerTrojan from './_Drawer/trojan'
import { useModel } from 'umi'

const ServerManagePage: FC = () => {
  const [adminNodes, setAdminNodes] = useState<API.Admin.NodeItem[]>()
  const [searchValue, setSearchValue] = useState('')
  const [sortStatus, setSortStatus] = useState(false)
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [drawerShadowsocksVisible, setDrawerShadowsocksVisible] = useState(false)
  const [drawerV2rayVisible, setDrawerV2rayVisible] = useState(false)
  const [drawerTrojanVisible, setDrawerTrojanVisible] = useState(false)

  const { initGroupsState } = useModel('useGroupModel')

  const intl = useIntl()

  useMount(() => {
    initGroupsState()
  })

  useEffect(() => {
    ;(async () => {
      if (listUpdateStatus === false && adminNodes !== undefined) {
        return
      }
      const nodesResult = await nodes()
      if (nodesResult === undefined) {
        return
      }
      setAdminNodes(nodesResult.data)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  const { run } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    },
    {
      wait: 500,
    },
  )

  const searchHandler = run
  const saveSortHandler = async () => {
    const sorts: API.Admin.NodeSortItem[] = []
    lodash.forEach(adminNodes, (nodeItem, index) => {
      sorts[index] = { key: nodeItem.type, value: nodeItem.id }
    })

    const nodeSortResult = await nodeSort({ sorts })
    if (nodeSortResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.server.manage.save_sort.message.success' }))
    setSortStatus(false)
  }

  const shadowsocksClickHandler = () => {
    setDrawerShadowsocksVisible(true)
  }
  const v2rayClickHandler = () => {
    setDrawerV2rayVisible(true)
  }

  const trojanClickHandler = () => {
    setDrawerTrojanVisible(true)
  }

  const onDrawerShadowsocksCloseHandler = () => {
    setDrawerShadowsocksVisible(false)
  }

  const onDrawerV2rayCloseHandler = () => {
    setDrawerV2rayVisible(false)
  }

  const onDrawerTrojanCloseHandler = () => {
    setDrawerTrojanVisible(false)
  }

  const menu = (
    <Menu>
      <Menu.Item key="shadowsocks">
        <Tag color="#489851" onClick={shadowsocksClickHandler}>
          ShadowSocks
        </Tag>
      </Menu.Item>
      <Menu.Item key="v2ray">
        <Tag color="#CB3180" onClick={v2rayClickHandler}>
          V2Ray
        </Tag>
      </Menu.Item>
      <Menu.Item key="trojan">
        <Tag color="#EAB854" onClick={trojanClickHandler}>
          Trojan
        </Tag>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="mb-0 block block-bottom  undefined">
          <div className="bg-white">
            <div className="p-3">
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>
                  <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                </Button>
              </Dropdown>
              <Input
                placeholder={intl.formatMessage({ id: 'module.server.manage.search.placeholder' })}
                className="ml-2"
                type="text"
                style={{ width: 200 }}
                defaultValue={searchValue}
                onChange={searchHandler}
              />
              {sortStatus && (
                <Button type="primary" className="float-right" onClick={saveSortHandler}>
                  <span>{intl.formatMessage({ id: 'module.server.manage.save_sort_btn' })}</span>
                </Button>
              )}
            </div>
            <div role="presentation">
              <List
                filteredValue={searchValue}
                dataSource={adminNodes as []}
                onEditItemSuccess={() => {
                  setListUpdateStatus(true)
                }}
                onDropItemSuccess={() => {
                  setListUpdateStatus(true)
                }}
                onCopyItemSuccess={() => {
                  setListUpdateStatus(true)
                }}
                onSort={(data: API.Admin.NodeItem[]) => {
                  setAdminNodes(data)
                  setSortStatus(true)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DrawerShadowsocks
        onClose={onDrawerShadowsocksCloseHandler}
        visible={drawerShadowsocksVisible}
        parentNodes={lodash.filter(adminNodes, { type: 'shadowsocks' })}
        onSubmitSuccess={() => {
          setDrawerShadowsocksVisible(false)
          setListUpdateStatus(true)
        }}
      />
      <DrawerV2ray
        onClose={onDrawerV2rayCloseHandler}
        visible={drawerV2rayVisible}
        parentNodes={lodash.filter(adminNodes, { type: 'v2ray' })}
        onSubmitSuccess={() => {
          setDrawerV2rayVisible(false)
          setListUpdateStatus(true)
        }}
      />
      <DrawerTrojan
        onClose={onDrawerTrojanCloseHandler}
        visible={drawerTrojanVisible}
        parentNodes={lodash.filter(adminNodes, { type: 'trojan' })}
        onSubmitSuccess={() => {
          setDrawerTrojanVisible(false)
          setListUpdateStatus(true)
        }}
      />
    </>
  )
}

export default ServerManagePage
