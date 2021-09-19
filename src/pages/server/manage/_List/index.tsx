import './style.less'
import type { FC } from 'react'
import { useIntl, Link, useModel } from 'umi'
import { Table, Tag, Space, Divider, Switch, Tooltip, Badge, Menu, Dropdown, message } from 'antd'
import {
  DragOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  FormOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import React, { useState } from 'react'
import { nodeUpdate, nodeDrop, nodeCopy } from '@/services'
import lodash from 'lodash'
import { arrayMoveImmutable } from 'array-move'
import DrawerShadowsocks from '../_Drawer/shadowsocks'
import DrawerTrojan from '../_Drawer/trojan'
import DrawerV2ray from '../_Drawer/v2ray'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.NodeItem[]
  filteredValue: string
  onEditItemSuccess: () => void
  onDropItemSuccess: () => void
  onCopyItemSuccess: () => void
  onSort: (data: API.Admin.NodeItem[]) => void
}

const List: FC<listProps> = (props) => {
  const intl = useIntl()
  const { groupsState } = useModel('useGroupModel')
  const [drawerShadowsocksVisible, setDrawerShadowsocksVisible] = useState(false)
  const [drawerTrojanVisible, setDrawerTrojanVisible] = useState(false)
  const [drawerV2rayVisible, setDrawerV2rayVisible] = useState(false)
  const [editNode, setEditNode] = useState<API.Admin.NodeItem>()

  const {
    dataSource,
    filteredValue,
    onEditItemSuccess,
    onCopyItemSuccess,
    onDropItemSuccess,
    onSort,
  } = props

  const SortableItem = SortableElement((elementProps: any) => <tr {...elementProps} />)
  const SortableBody = SortableContainer((contaninerProps: any) => <tbody {...contaninerProps} />)

  const dropItemHandler = async (id: number, type: string) => {
    const nodeDropResult = await nodeDrop(type, { id })
    if (nodeDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.server.manage.list.column.action.drop.message.success' }),
    )
    onDropItemSuccess()
  }

  const copyItemHandler = async (id: number, type: string) => {
    const nodeCopyResult = await nodeCopy(type, { id })
    if (nodeCopyResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.server.manage.list.column.action.copy.message.success' }),
    )
    onCopyItemSuccess()
  }

  const DragHandle = SortableHandle<API.Admin.NodeItem>((dragHandleProps: API.Admin.NodeItem) => {
    const { id, type } = dragHandleProps
    return (
      <>
        <DragOutlined style={{ cursor: 'move', color: '#999', verticalAlign: '0.05rem' }} />
        <Divider type="vertical" />
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()

                    setEditNode(dragHandleProps)

                    if (type === 'shadowsocks') {
                      setDrawerShadowsocksVisible(true)
                    } else if (type === 'trojan') {
                      setDrawerTrojanVisible(true)
                    } else if (type === 'v2ray') {
                      setDrawerV2rayVisible(true)
                    }
                  }}
                >
                  <Space>
                    <FormOutlined style={{ verticalAlign: '0.05rem' }} />
                    {intl.formatMessage({ id: 'module.server.manage.list.column.action.edit' })}
                  </Space>
                </Link>
              </Menu.Item>
              <Menu.Item key="copy">
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    copyItemHandler(id, type)
                  }}
                >
                  <Space>
                    <CopyOutlined style={{ verticalAlign: '0.05rem' }} />
                    {intl.formatMessage({ id: 'module.server.manage.list.column.action.copy' })}
                  </Space>
                </Link>
              </Menu.Item>
              <Menu.Item key="delete">
                <Link
                  to=""
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    dropItemHandler(id, type)
                  }}
                >
                  <Space>
                    <DeleteOutlined style={{ color: '#FF4D4F', verticalAlign: '0.05rem' }} />
                    {intl.formatMessage({ id: 'module.server.manage.list.column.action.drop' })}
                  </Space>
                </Link>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Link
            to="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
            }}
          >
            {intl.formatMessage({ id: 'module.server.manage.list.column.action.btn' })}
          </Link>
        </Dropdown>
      </>
    )
  })
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: any; newIndex: any }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(dataSource as []), oldIndex, newIndex).filter(
        (el) => !!el,
      )
      onSort(newData)
    }
  }

  const draggableContainer = (draggableContainerProps: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...draggableContainerProps}
    />
  )

  const draggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = dataSource
      ? dataSource.findIndex((x) => `${x.type}-${x.id}` === restProps['data-row-key'])
      : 0
    return <SortableItem index={index} {...restProps} />
  }

  const showChangeHandler = async (record: API.Admin.NodeItem, checked: boolean) => {
    await nodeUpdate(record.type, { id: record.id, show: checked ? 1 : 0 })
  }
  return (
    <>
      <Table
        dataSource={dataSource}
        components={{ body: { wrapper: draggableContainer, row: draggableBodyRow } }}
        pagination={false}
        rowKey={(record) => {
          return `${record.type}-${record.id}`
        }}
        scroll={{ x: true }}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.server.manage.list.column.action' })}
          key="id"
          align="left"
          className="drag-visible"
          render={(text, record: API.Admin.NodeItem) => <DragHandle {...record} />}
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.manage.list.column.id' })}
          key="id"
          dataIndex="id"
          render={(id: number, record: API.Admin.NodeItem) => {
            return (
              <>
                {record.type === 'shadowsocks' && (
                  <Tag color="#489851">
                    {record.parent_id > 0 ? `${record.id} => ${record.parent_id}` : record.id}
                  </Tag>
                )}
                {record.type === 'v2ray' && (
                  <Tag color="#CB3180">
                    {record.parent_id > 0 ? `${record.id} => ${record.parent_id}` : record.id}
                  </Tag>
                )}
                {record.type === 'trojan' && (
                  <Tag color="#EAB854">
                    {record.parent_id > 0 ? `${record.id} => ${record.parent_id}` : record.id}
                  </Tag>
                )}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.manage.list.column.show' })}
          key="show"
          dataIndex="show"
          render={(show: number, record: API.Admin.NodeItem) => {
            return (
              <>
                <Switch
                  defaultChecked={Boolean(show).valueOf()}
                  onChange={(checked: boolean, event: Event) => {
                    event.preventDefault()
                    showChangeHandler(record, checked)
                  }}
                  size="small"
                />
              </>
            )
          }}
        />
        <Column
          title={
            <>
              <Space>
                {intl.formatMessage({ id: 'module.server.manage.list.column.name' })}
                <Tooltip
                  title={
                    <>
                      <Badge status="error" />
                      {intl.formatMessage({
                        id: 'module.server.manage.list.column.name.tip.error',
                      })}
                      <br />
                      <Badge status="warning" />
                      {intl.formatMessage({
                        id: 'module.server.manage.list.column.name.tip.warning',
                      })}
                      <br />
                      <Badge status="processing" />
                      {intl.formatMessage({
                        id: 'module.server.manage.list.column.name.tip.processing',
                      })}
                    </>
                  }
                >
                  <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
                </Tooltip>
              </Space>
            </>
          }
          key="name"
          dataIndex="name"
          filteredValue={filteredValue.length > 0 ? [filteredValue] : []}
          onFilter={(value, record) =>
            record.name.indexOf(value as string) === 0 ||
            record.host.indexOf(value as string) === 0 ||
            record.port.toString().indexOf(value as string) === 0
          }
          render={(title: string, record: API.Admin.NodeItem) => {
            return (
              <>
                {record.available_status === 0 && <Badge status="error" />}
                {record.available_status === 1 && <Badge status="warning" />}
                {record.available_status === 2 && <Badge status="processing" />}
                {title}
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.manage.list.columnress' })}
          dataIndex={['host', 'port']}
          render={(text, record: API.Admin.NodeItem) => {
            return <>{record.port > 0 ? `${record.host}:${record.port}` : `${record.host}`}</>
          }}
        />
        <Column
          title={
            <>
              <Space>
                {intl.formatMessage({ id: 'module.server.manage.list.column.online' })}
                <Tooltip
                  title={intl.formatMessage({ id: 'module.server.manage.list.column.online.tip' })}
                >
                  <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
                </Tooltip>
              </Space>
            </>
          }
          key="online"
          dataIndex="online"
          render={(online: number) => {
            return (
              <>
                <Space>
                  <UserOutlined style={{ verticalAlign: '0.05rem' }} />
                  {online}
                </Space>
              </>
            )
          }}
        />
        <Column
          title={
            <Space>
              {intl.formatMessage({ id: 'module.server.manage.list.column.rate' })}
              <Tooltip
                title={intl.formatMessage({ id: 'module.server.manage.list.column.rate.tip' })}
              >
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          }
          key="rate"
          dataIndex="rate"
          render={(rate: number) => {
            return (
              <>
                <Tag>
                  <Space>{rate}x</Space>
                </Tag>
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.server.manage.list.column.group' })}
          dataIndex="group_id"
          key="group_id"
          render={(groupIds: string[]) => {
            return (
              <>
                <Space>
                  {groupIds.map((id: string) => {
                    const idNum = Number(id).valueOf()
                    const tagName = lodash.find(groupsState, { id: idNum })?.name

                    return <Tag key={id}>{tagName}</Tag>
                  })}
                </Space>
              </>
            )
          }}
        />
      </Table>
      {editNode && (
        <DrawerShadowsocks
          visible={drawerShadowsocksVisible}
          onClose={() => {
            setDrawerShadowsocksVisible(false)
          }}
          onSubmitSuccess={() => {
            setDrawerShadowsocksVisible(false)
            onEditItemSuccess()
          }}
          parentNodes={lodash.filter(dataSource, { type: 'shadowsocks' })}
          node={editNode}
          key={`shadowsocks-${editNode.id}`}
        />
      )}
      {editNode && (
        <DrawerTrojan
          visible={drawerTrojanVisible}
          onClose={() => {
            setDrawerTrojanVisible(false)
          }}
          onSubmitSuccess={() => {
            setDrawerTrojanVisible(false)
            onEditItemSuccess()
          }}
          parentNodes={lodash.filter(dataSource, { type: 'trojan' })}
          node={editNode}
          key={`trojan-${editNode.id}`}
        />
      )}
      {editNode && (
        <DrawerV2ray
          visible={drawerV2rayVisible}
          onClose={() => {
            setDrawerV2rayVisible(false)
          }}
          onSubmitSuccess={() => {
            setDrawerV2rayVisible(false)
            onEditItemSuccess()
          }}
          parentNodes={lodash.filter(dataSource, { type: 'v2ray' })}
          node={editNode}
          key={`v2ray-${editNode.id}`}
        />
      )}
    </>
  )
}

export default List
