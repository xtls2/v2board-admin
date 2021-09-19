import type { FC } from 'react'
import { useIntl, useLocation } from 'umi'
import { Space, Button } from 'antd'
import { useState, useEffect } from 'react'
import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { orders, plans } from '@/services'
import type { changeValues } from './_List'
import List from './_List'
import ModalAssignOrder from '@/components/Modal/assignOrder'
import DrawerFilter from './_Drawer/filter'

const OrderPage: FC = () => {
  const intl = useIntl()
  const location = useLocation()

  const state =
    location.state !== undefined
      ? (location.state as { filter: API.Admin.OrderFilterItem[] })
      : { filter: undefined }
  const [filter, setFilter] = useState<API.Admin.OrderFilterItem[] | undefined>(state.filter)
  const [listUpdateStatus, setListUpdateStatus] = useState(false)
  const [modalAssignOrderVisible, setModalAssignOrderVisible] = useState(false)
  const [drawerFilterVisible, setDrawerFilterVisible] = useState(false)
  const [adminOrders, setAdminOrders] = useState<API.Admin.OrderItem[]>()
  const [adminPlans, setAdminPlans] = useState<API.Admin.PlanItem[]>()
  const [pageSize, setPageSize] = useState(10)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (adminOrders !== undefined && listUpdateStatus === false) {
        return
      }
      const ordersResult = await orders({ pageSize, current, filter })
      if (ordersResult === undefined) {
        return
      }

      setAdminOrders(ordersResult.data)
      setTotal(ordersResult.total)
      setListUpdateStatus(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateStatus])

  useEffect(() => {
    ;(async () => {
      const plansResult = await plans()
      if (plansResult === undefined) {
        return
      }
      setAdminPlans(plansResult.data)
    })()
  }, [])

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
                <Button
                  value="large"
                  icon={<PlusOutlined style={{ verticalAlign: '0.05rem' }} />}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setModalAssignOrderVisible(true)
                  }}
                >
                  {intl.formatMessage({ id: 'module.order.add_btn' })}
                </Button>
              </Space>
            </div>

            <List
              dataSource={adminOrders as []}
              plans={adminPlans as []}
              total={total}
              pageSize={pageSize}
              current={current}
              onChange={(values: changeValues) => {
                setPageSize(values.pageSize)
                setCurrent(values.pageCurrent)
                setListUpdateStatus(true)
              }}
              onEditSuccess={() => {
                setListUpdateStatus(true)
              }}
            />
          </div>
        </div>
      </div>
      {adminPlans !== undefined && (
        <ModalAssignOrder
          visible={modalAssignOrderVisible}
          onCancel={() => {
            setModalAssignOrderVisible(false)
          }}
          onSubmitSuccess={() => {
            setModalAssignOrderVisible(false)
            setListUpdateStatus(true)
          }}
          plans={adminPlans}
        />
      )}
      <DrawerFilter
        visible={drawerFilterVisible}
        onClose={() => {
          setDrawerFilterVisible(false)
        }}
        onChange={(filterValues: API.Admin.OrderFilterItem[] | undefined) => {
          setFilter(filterValues)
          setListUpdateStatus(true)
          setDrawerFilterVisible(false)
        }}
      />
    </>
  )
}
export default OrderPage
