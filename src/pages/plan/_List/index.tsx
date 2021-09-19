import './style.less'
import type { FC } from 'react'
import { useIntl, Link, useModel } from 'umi'
import { Table, Space, Divider, Switch, Menu, Dropdown, message, Tag } from 'antd'
import {
  DragOutlined,
  FormOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import React, { useState } from 'react'
import { planUpdate, planDrop } from '@/services'
import lodash from 'lodash'
import { arrayMoveImmutable } from 'array-move'
import { currencyFormatter } from '@/default'
import ModalPlan from '../_Modal'

const { Column } = Table

export interface listProps {
  dataSource: API.Admin.PlanItem[]
  onEditItemSuccess: () => void
  onDropItemSuccess: () => void
  onSort: (data: API.Admin.PlanItem[]) => void
}

const List: FC<listProps> = (props) => {
  const intl = useIntl()
  const { groupsState } = useModel('useGroupModel')
  const [modalPlanVisible, setModalPlanVisible] = useState(false)
  const [editPlan, setEditPlan] = useState<API.Admin.PlanItem>()
  const { dataSource, onEditItemSuccess, onDropItemSuccess, onSort } = props

  const SortableItem = SortableElement((elementProps: any) => <tr {...elementProps} />)
  const SortableBody = SortableContainer((contaninerProps: any) => <tbody {...contaninerProps} />)

  const dropItemHandler = async (id: number) => {
    const planDropResult = await planDrop({ id })
    if (planDropResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({ id: 'module.plan.list.column.action.drop.message.success' }),
    )
    onDropItemSuccess()
  }

  const DragHandle = SortableHandle<API.Admin.PlanItem>((dragHandleProps: API.Admin.PlanItem) => {
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
                    setEditPlan(dragHandleProps)
                    setModalPlanVisible(true)
                  }}
                >
                  <Space>
                    <FormOutlined style={{ verticalAlign: '0.05rem' }} />
                    {intl.formatMessage({ id: 'module.plan.list.column.action.edit' })}
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
                    {intl.formatMessage({ id: 'module.plan.list.column.action.drop' })}
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
            {intl.formatMessage({ id: 'module.plan.list.column.action.btn' })}
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
    const index = dataSource ? dataSource.findIndex((x) => x.id === restProps['data-row-key']) : 0
    return <SortableItem index={index} {...restProps} />
  }

  const showChangeHandler = async (record: API.Admin.PlanItem, checked: boolean) => {
    await planUpdate({ id: record.id, show: Number(checked).valueOf() })
  }

  const renewChangeHandler = async (record: API.Admin.PlanItem, checked: boolean) => {
    await planUpdate({ id: record.id, renew: Number(checked).valueOf() })
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
          title={intl.formatMessage({ id: 'module.plan.list.column.action' })}
          key="id"
          align="left"
          className="drag-visible"
          render={(text, record: API.Admin.PlanItem) => <DragHandle {...record} />}
        />

        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.show' })}
          key="show"
          dataIndex="show"
          render={(show: number, record: API.Admin.PlanItem) => {
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
            <Space>
              {intl.formatMessage({ id: 'module.plan.list.column.renew' })}
              <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
            </Space>
          }
          key="renew"
          dataIndex="renew"
          render={(renew: number, record: API.Admin.PlanItem) => {
            return (
              <>
                <Switch
                  defaultChecked={Boolean(renew).valueOf()}
                  onChange={(checked: boolean, event: Event) => {
                    event.preventDefault()
                    renewChangeHandler(record, checked)
                  }}
                  size="small"
                />
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.name' })}
          key="name"
          dataIndex="name"
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.count' })}
          key="count"
          dataIndex="count"
          render={(count: number) => {
            return (
              <Space>
                <UserOutlined style={{ verticalAlign: '0.05rem' }} />
                {count}
              </Space>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.transfer_enable' })}
          key="transfer_enable"
          dataIndex="transfer_enable"
          render={(transferEnable: number) => {
            return `${transferEnable} GB`
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.month_price' })}
          key="month_price"
          dataIndex="month_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.quarter_price' })}
          key="quarter_price"
          dataIndex="quarter_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.half_year_price' })}
          key="half_year_price"
          dataIndex="half_year_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.year_price' })}
          key="year_price"
          dataIndex="year_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.two_year_price' })}
          key="two_year_price"
          dataIndex="two_year_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.three_year_price' })}
          key="three_year_price"
          dataIndex="three_year_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.onetime_price' })}
          key="onetime_price"
          dataIndex="onetime_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.reset_price' })}
          key="reset_price"
          dataIndex="reset_price"
          render={(price: number | null) => {
            return price !== null ? currencyFormatter.format(price / 100) : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.plan.list.column.group_id' })}
          key="group_id"
          dataIndex="group_id"
          render={(groupID: number) => {
            const tagName = lodash.find(groupsState, { id: Number(groupID).valueOf() })?.name
            return <Tag key={groupID}>{tagName}</Tag>
          }}
        />
      </Table>
      {editPlan && (
        <ModalPlan
          visible={modalPlanVisible}
          onCancel={() => {
            setModalPlanVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalPlanVisible(false)
            onEditItemSuccess()
          }}
          defaultPlan={editPlan}
          key={editPlan.id}
        />
      )}
    </>
  )
}

export default List
