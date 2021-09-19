import type { FC } from 'react'
import { useIntl, Link, useLocation } from 'umi'
import { useState, useEffect } from 'react'
import { Button, Space, Menu, Dropdown, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ModalSendMail from './_Modal/sendMail'
import ModalGenerate from './_Modal/generate'
import DrawerFilter from './_Drawer/filter'
import {
  FilterOutlined,
  SelectOutlined,
  UserAddOutlined,
  FileExcelOutlined,
  MailOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { users, groups, plans, userDumpCSV, userBatchBan } from '@/services'
import List from './_List'
import type { changeValues } from './_List'

import moment from 'moment'

const { confirm } = Modal

const UserPage: FC = () => {
  const intl = useIntl()
  const location = useLocation()
  const state =
    location.state !== undefined
      ? (location.state as { filter: API.Admin.UserFilterItem[] })
      : { filter: undefined }

  const [adminUsers, setAdminUsers] = useState<(API.Admin.UserItem & API.User.InfoItem)[]>()
  const [adminGroups, setAdminGroups] = useState<API.Admin.GroupItem[]>()
  const [adminPlans, setAdminPlans] = useState<API.Admin.PlanItem[]>()
  const [filter, setFilter] = useState<API.Admin.UserFilterItem[] | undefined>(state.filter)
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sort, setSort] = useState<string>()
  const [sortType, setSortType] = useState<string>()
  const [listUpdateStatus, setListUpdateStatus] = useState(true)
  const [total, setTotal] = useState(0)
  const [modalSendMailVisible, setModalSendMailVisible] = useState(false)
  const [modalGenerateVisible, setModalGenerateVisible] = useState(false)
  const [drawerFilterVisible, setDrawerFilterVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (adminUsers !== undefined && listUpdateStatus === false) {
        return
      }
      const usersResult = await users({ filter, pageSize, current, sort, sort_type: sortType })
      if (usersResult === undefined) {
        return
      }
      setAdminUsers(usersResult.data)
      setTotal(usersResult.total)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  useEffect(() => {
    ;(async () => {
      const groupResult = await groups()
      if (groupResult === undefined) {
        return
      }
      setAdminGroups(groupResult.data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const plansResult = await plans()
      if (plansResult === undefined) {
        return
      }
      setAdminPlans(plansResult.data)
    })()
  }, [])

  const actionMenu = (
    <Menu>
      <Menu.Item key="export_csv">
        <Link
          to=""
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            userDumpCSV({ filter }).then((data: Blob) => {
              if (data === undefined) {
                return Promise.reject()
              }
              const binaryData = []
              binaryData.push(data)
              const downloadLink = document.createElement('a')
              downloadLink.href = window.URL.createObjectURL(
                new Blob(binaryData, { type: 'text/csv' }),
              )
              downloadLink.setAttribute(
                'download',
                `users-${moment().format('YYYY-MM-DD HH:MM:SS')}`,
              )
              document.body.appendChild(downloadLink)
              downloadLink.click()
              downloadLink.remove()
              return Promise.resolve()
            })
          }}
        >
          <Space>
            <FileExcelOutlined style={{ verticalAlign: '0.05rem' }} />
            {intl.formatMessage({ id: 'module.user.action.export_csv' })}
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="send_email">
        <Link
          to=""
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            setModalSendMailVisible(true)
          }}
        >
          <Space>
            <MailOutlined style={{ verticalAlign: '0.05rem' }} />
            {intl.formatMessage({ id: 'module.user.action.send_email' })}
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="batch_ban">
        <Link
          to=""
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            confirm({
              title: intl.formatMessage({ id: 'module.user.action.batch_ban.confirm.title' }),
              icon: <ExclamationCircleOutlined />,
              content: intl.formatMessage({ id: 'module.user.action.batch_ban.confirm.content' }),
              onOk() {
                if (filter) {
                  const userBatchBanResult = userBatchBan({ filter })
                  if (userBatchBanResult === undefined) {
                    return
                  }
                  message.success(
                    intl.formatMessage({ id: 'module.user.action.batch_ban.message.success' }),
                  )
                  setListUpdateStatus(true)
                }
              },
            })
          }}
          disabled={filter === undefined}
        >
          <Space>
            <StopOutlined style={{ verticalAlign: '0.05rem' }} />
            {intl.formatMessage({ id: 'module.user.action.batch_ban' })}
          </Space>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="d-flex justify-content-between align-items-center" />
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Space>
                <Button
                  value="large"
                  icon={<FilterOutlined style={{ verticalAlign: '0.05rem' }} />}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setDrawerFilterVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.user.filter_btn' })}
                </Button>
                <Dropdown overlay={actionMenu} placement="bottomCenter">
                  <Button
                    value="large"
                    icon={<SelectOutlined style={{ verticalAlign: '0.05rem' }} />}
                  >
                    {intl.formatMessage({ id: 'module.user.action_btn' })}
                  </Button>
                </Dropdown>

                <Button
                  icon={<UserAddOutlined style={{ verticalAlign: '0.05rem' }} />}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setModalGenerateVisible(true)
                  }}
                />
              </Space>
            </div>
          </div>
          <List
            dataSource={adminUsers as []}
            total={total}
            pageSize={pageSize}
            current={current}
            groups={adminGroups as []}
            plans={adminPlans as []}
            onChange={(values: changeValues) => {
              setCurrent(values.pageCurrent)
              setPageSize(values.pageSize)
              if (values.sort !== undefined) {
                setSort(values.sort)
              }
              if (values.sortType !== undefined) {
                setSortType(values.sortType)
              }
              if (values.filter !== undefined) {
                setFilter(values.filter)
              }
              setListUpdateStatus(true)
            }}
            onEditSuccess={() => {
              setListUpdateStatus(true)
            }}
          />
        </div>
      </div>
      <ModalSendMail
        visible={modalSendMailVisible}
        onCancel={() => {
          setModalSendMailVisible(false)
        }}
        onSubmitSuccess={() => {
          setModalSendMailVisible(false)
        }}
        filter={filter}
      />

      {adminPlans && (
        <ModalGenerate
          visible={modalGenerateVisible}
          onCancel={() => {
            setModalGenerateVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalGenerateVisible(false)
            setListUpdateStatus(true)
          }}
          plans={adminPlans}
        />
      )}

      {adminPlans && (
        <DrawerFilter
          visible={drawerFilterVisible}
          onClose={() => {
            setDrawerFilterVisible(false)
          }}
          onChange={(filterValues: API.Admin.UserFilterItem[] | undefined) => {
            setFilter(filterValues)
            setListUpdateStatus(true)
            setDrawerFilterVisible(false)
          }}
          plans={adminPlans}
        />
      )}
    </>
  )
}
export default UserPage
