import './style.less'
import type { FC } from 'react'
import { useIntl, Link } from 'umi'
import { Table, Space, Divider, Switch, Menu, Dropdown, message } from 'antd'
import { DragOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import React, { useState } from 'react'
import { knowledgeShow, knowledgeDrop } from '@/services'
import DrawerKnowledge from '../_Drawer'
import moment from 'moment'
import { arrayMoveImmutable } from 'array-move'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.KnowledgeItem[]
  onEditItemSuccess: () => void
  onDropItemSuccess: () => void
  onSort: (data: API.Admin.KnowledgeItem[]) => void
}

const List: FC<listProps> = (props) => {
  const intl = useIntl()
  const [drawerKnowledgeVisible, setDrawerKnowledgeVisible] = useState(false)
  const [editKnowledge, setEditKnowledge] = useState<API.Admin.KnowledgeItem>()

  const { dataSource, onEditItemSuccess, onDropItemSuccess, onSort } = props

  const SortableItem = SortableElement((elementProps: any) => <tr {...elementProps} />)
  const SortableBody = SortableContainer((contaninerProps: any) => <tbody {...contaninerProps} />)

  const dropItemHandler = async (id: number) => {
    const knowledgeDropResult = await knowledgeDrop({ id })
    if (knowledgeDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.knowledge.list.column.action.drop.message.success' }),
    )
    onDropItemSuccess()
  }

  const DragHandle = SortableHandle<API.Admin.KnowledgeItem>(
    (dragHandleProps: API.Admin.KnowledgeItem) => {
      const { id } = dragHandleProps
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
                      setEditKnowledge(dragHandleProps)
                      setDrawerKnowledgeVisible(true)
                    }}
                  >
                    <Space>
                      <FormOutlined style={{ verticalAlign: '0.05rem' }} />
                      {intl.formatMessage({ id: 'module.knowledge.list.column.action.edit' })}
                    </Space>
                  </Link>
                </Menu.Item>
                <Menu.Item key="delete">
                  <Link
                    to=""
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      dropItemHandler(id)
                    }}
                  >
                    <Space>
                      <DeleteOutlined style={{ color: '#FF4D4F', verticalAlign: '0.05rem' }} />
                      {intl.formatMessage({ id: 'module.knowledge.list.column.action.drop' })}
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
              {intl.formatMessage({ id: 'module.knowledge.list.column.action.btn' })}
            </Link>
          </Dropdown>
        </>
      )
    },
  )
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
    const index = dataSource ? dataSource.findIndex((x) => x.id === restProps['data-row-key']) : 0
    return <SortableItem index={index} {...restProps} />
  }

  const showChangeHandler = async (record: API.Admin.KnowledgeItem) => {
    await knowledgeShow({ id: record.id })
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        components={{ body: { wrapper: draggableContainer, row: draggableBodyRow } }}
        pagination={false}
        rowKey="id"
        scroll={{ x: true }}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.action' })}
          key="id"
          align="left"
          className="drag-visible"
          render={(text, record: API.Admin.KnowledgeItem) => <DragHandle {...record} />}
        />

        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.show' })}
          key="show"
          dataIndex="show"
          render={(show: number, record: API.Admin.KnowledgeItem) => {
            return (
              <>
                <Switch
                  defaultChecked={Boolean(show).valueOf()}
                  onChange={(checked: boolean, event: Event) => {
                    event.preventDefault()
                    showChangeHandler(record)
                  }}
                  size="small"
                />
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.title' })}
          key="title"
          dataIndex="title"
        />
        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.category' })}
          key="title"
          dataIndex="title"
        />
        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.category' })}
          key="title"
          dataIndex="title"
        />
        <Column
          title={intl.formatMessage({ id: 'module.knowledge.list.column.updated_at' })}
          key="updated_at"
          dataIndex="updated_at"
          render={(updatedAt: number) => {
            return moment.unix(updatedAt).format('YYYY-MM-DD HH:MM')
          }}
        />
      </Table>
      {editKnowledge && (
        <DrawerKnowledge
          onClose={() => {
            setDrawerKnowledgeVisible(false)
          }}
          visible={drawerKnowledgeVisible}
          onSubmitSuccess={() => {
            setDrawerKnowledgeVisible(false)
            onEditItemSuccess()
          }}
          defaultKnowledge={editKnowledge}
          key={editKnowledge.id}
        />
      )}
    </>
  )
}

export default List
