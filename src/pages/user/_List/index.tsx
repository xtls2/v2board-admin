import type { FC } from 'react'
import type { TablePaginationConfig, SorterResult, FilterValue } from 'antd/lib/table/interface'
import { message, Space, Tooltip } from 'antd'
import { Table, Badge, Menu, Tag, Dropdown, Modal } from 'antd'
import { useState } from 'react'
import { userResetSecret } from '@/services'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  QuestionCircleOutlined,
  EditOutlined,
  PlusOutlined,
  CopyOutlined,
  ReloadOutlined,
  AccountBookOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useIntl, Link } from 'umi'
import React from 'react'
import moment from 'moment'
import lodash from 'lodash'
import DrawerEdit from '../_Drawer/edit'
import ModalAssignOrder from '@/components/Modal/assignOrder'
import clipboardy from '@umijs/deps/reexported/clipboardy'

const { Column } = Table
const { confirm } = Modal

export interface changeValues {
  pageSize: number
  pageCurrent: number
  sort?: string
  sortType?: 'ASC' | 'DESC'
  filter?: API.Admin.UserFilterItem[]
}

export interface listProps {
  dataSource: (API.Admin.UserItem & API.User.InfoItem)[]
  total: number
  pageSize: number
  current: number
  groups: API.Admin.GroupItem[]
  plans: API.Admin.PlanItem[]
  onChange: (values: changeValues) => void
  onEditSuccess: () => void
}

const List: FC<listProps> = (props) => {
  const { dataSource, total, pageSize, current, groups, plans, onChange, onEditSuccess } = props
  const [drawerEditVisible, setDrawerEditVisible] = useState(false)
  const [modalAssignOrderVisible, setModalAssignOrderVisible] = useState(false)
  const [editUser, setEditUser] = useState<API.Admin.UserItem & API.User.InfoItem>()
  const [assignOrderUser, setAssignOrderUser] = useState<API.Admin.UserItem & API.User.InfoItem>()
  const intl = useIntl()

  const tableChangeHandler = (
    pagenation: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<API.Admin.UserItem & API.User.InfoItem>
      | SorterResult<API.Admin.UserItem & API.User.InfoItem>[],
  ) => {
    const sorts = sorter as { field: string; order: string }
    let values: changeValues
    if (JSON.stringify(sorts) !== '{}') {
      values = {
        pageCurrent: pagenation.current as number,
        pageSize: pagenation.pageSize as number,
        sort: sorts.field,
        sortType: sorts.order === 'ascend' ? 'ASC' : 'DESC',
      }
    } else {
      values = {
        pageCurrent: pagenation.current as number,
        pageSize: pagenation.pageSize as number,
      }
    }
    onChange(values)
  }

  const pagenationProps: TablePaginationConfig = {
    pageSize,
    showQuickJumper: false,
    showLessItems: false,
    showSizeChanger: true,
    total,
    size: 'small',
    current,
    pageSizeOptions: ['10', '50', '100', '150'],
  }

  const actionMenu = (record: API.Admin.UserItem & API.User.InfoItem) => {
    return (
      <Menu>
        <Menu.Item key="edit">
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              setEditUser(record)
              setDrawerEditVisible(true)
            }}
          >
            <Space>
              <EditOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.edit' })}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="assign_order">
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              setAssignOrderUser(record)
              setModalAssignOrderVisible(true)
            }}
          >
            <Space>
              <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.assign_order' })}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="copy_url">
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              clipboardy.write(record.subscribe_url as string).then(() => {
                message.success(intl.formatMessage({ id: 'common.message.copy_success' }))
              })
            }}
          >
            <Space>
              <CopyOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.copy_url' })}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="reset_secert">
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              confirm({
                title: intl.formatMessage({ id: 'module.user.action.reset_secert.confirm.title' }),
                icon: <ExclamationCircleOutlined />,
                content: intl.formatMessage(
                  { id: 'module.user.action.reset_secert.confirm.content' },
                  { email: record.email },
                ),
                onOk: async () => {
                  const userRestSecretResult = await userResetSecret({ id: record.id })
                  if (userRestSecretResult === undefined) {
                    return
                  }
                  message.success(
                    intl.formatMessage({ id: 'module.user.action.reset_secert.message.success' }),
                  )
                  onEditSuccess()
                },
              })
            }}
          >
            <Space>
              <ReloadOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.reset_secret' })}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="user_order">
          <Link
            to={{
              pathname: '/order',
              state: { filter: [{ key: 'user_id', condition: '=', value: record.id }] },
            }}
          >
            <Space>
              <AccountBookOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.user_order' })}
            </Space>
          </Link>
        </Menu.Item>
        <Menu.Item key="user_invite">
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              onChange({
                pageCurrent: 1,
                pageSize: 10,
                filter: [{ key: 'invite_user_id', condition: '=', value: record.id.toString() }],
              })
            }}
          >
            <Space>
              <UsergroupAddOutlined style={{ verticalAlign: '0.05rem' }} />
              {intl.formatMessage({ id: 'module.user.list.column.action.user_invite' })}
            </Space>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <>
      <Table
        dataSource={dataSource}
        pagination={pagenationProps}
        rowKey="id"
        scroll={{ x: true }}
        onChange={tableChangeHandler}
        loading={dataSource === undefined}
      >
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.action' })}
          dataIndex="action"
          key="action"
          render={(action: string, record: API.Admin.UserItem & API.User.InfoItem) => {
            return (
              <>
                <Dropdown overlay={actionMenu(record)} placement="bottomLeft" trigger={['click']}>
                  <Link
                    to=""
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                    }}
                  >
                    {intl.formatMessage({ id: 'module.user.list.column.action' })}
                  </Link>
                </Dropdown>
              </>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.id' })}
          dataIndex="id"
          key="id"
          sorter={true}
          showSorterTooltip={false}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.email' })}
          dataIndex="email"
          key="email"
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.banned' })}
          dataIndex="banned"
          key="banned"
          sorter={true}
          showSorterTooltip={false}
          render={(banned: number) => {
            return (
              <Space>
                {banned === 0 ? (
                  <Tag color="green">
                    {intl.formatMessage({ id: 'module.user.list.column.banned.off' })}
                  </Tag>
                ) : (
                  <Tag color="red">
                    {intl.formatMessage({ id: 'module.user.list.column.banned.on' })}
                  </Tag>
                )}
              </Space>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.plan_id' })}
          dataIndex="plan_id"
          key="plan_id"
          sorter={true}
          showSorterTooltip={false}
          render={(planId: number, record: API.Admin.UserItem & API.User.InfoItem) => {
            return record.plan_name !== undefined ? record.plan_name : '-'
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.group_id' })}
          dataIndex="group_id"
          key="group_id"
          sorter={true}
          showSorterTooltip={false}
          render={(groupID: number) => {
            const group = groupID > 0 ? lodash.find(groups, { id: groupID }) : undefined
            return group !== undefined ? group.name : '-'
          }}
        />
        <Column
          title={
            <Space>
              {intl.formatMessage({ id: 'module.user.list.column.t' })}
              <Tooltip title={intl.formatMessage({ id: 'module.user.list.column.t.tip' })}>
                <QuestionCircleOutlined style={{ verticalAlign: '0.05rem' }} />
              </Tooltip>
            </Space>
          }
          dataIndex="t"
          key="t"
          render={(t: number) => {
            const isOnline = moment().unix() - t <= 1800
            return isOnline ? <Badge status="processing" /> : <Badge status="default" />
          }}
          align="center"
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.d' })}
          dataIndex="d"
          key="d"
          sorter={true}
          showSorterTooltip={false}
          render={(d: string, record: API.Admin.UserItem & API.User.InfoItem) => {
            const usedValue = (record.u + record.d) / (1024 * 1024 * 1024)
            const totalValue = record.transfer_enable / (1024 * 1024 * 1024)
            return (
              <Space>
                <Tag color={totalValue >= usedValue ? 'green' : 'red'}>{usedValue.toFixed(2)}</Tag>
              </Space>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.transfer_enable' })}
          dataIndex="transfer_enable"
          key="transfer_enable"
          sorter={true}
          showSorterTooltip={false}
          render={(transferEnable: number) => {
            const transferEnableValue = transferEnable / (1024 * 1024 * 1024)
            return transferEnableValue.toFixed(2)
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.expired_at' })}
          dataIndex="expired_at"
          key="expired_at"
          sorter={true}
          showSorterTooltip={false}
          render={(expiredAt: number | null) => {
            return (
              <Space>
                <Tag
                  color={
                    expiredAt === null ||
                    (typeof expiredAt === 'number' && expiredAt > moment().unix())
                      ? 'green'
                      : 'red'
                  }
                >
                  {expiredAt === null
                    ? intl.formatMessage({ id: 'module.user.list.column.expired_at.nerver_expire' })
                    : moment.unix(expiredAt).format('YYYY-MM-DD HH:MM')}
                </Tag>
              </Space>
            )
          }}
        />
        <Column
          title={intl.formatMessage({ id: 'module.user.list.column.created_at' })}
          dataIndex="created_at"
          key="created_at"
          sorter={true}
          showSorterTooltip={false}
          render={(created_at: number) => {
            return moment.unix(created_at).format('YYYY-MM-DD HH:MM')
          }}
        />
      </Table>
      {editUser && (
        <DrawerEdit
          plans={plans}
          visible={drawerEditVisible}
          onSubmitSuccess={() => {
            setDrawerEditVisible(false)
            onEditSuccess()
          }}
          onClose={() => {
            setDrawerEditVisible(false)
          }}
          defaultUser={editUser}
          key={editUser.id}
        />
      )}
      {assignOrderUser && (
        <ModalAssignOrder
          visible={modalAssignOrderVisible}
          onCancel={() => {
            setModalAssignOrderVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalAssignOrderVisible(false)
          }}
          key={assignOrderUser.id}
          defaultUser={assignOrderUser}
          plans={plans}
        />
      )}
    </>
  )
}

export default List
