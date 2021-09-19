import type { FC } from 'react'
import { useIntl } from 'umi'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { coupons, plans } from '@/services'
import List from './_List'
import ModalCoupon from './_Modal'

const CouponPage: FC = () => {
  const intl = useIntl()
  const [adminCoupons, setAdminCoupons] = useState<API.Admin.CouponItem[]>()
  const [adminPlans, setAdminPlans] = useState<API.Admin.PlanItem[]>()
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [current, setCurrent] = useState(1)
  const [modalCouponVisible, setModalCouponVisible] = useState(false)
  const [listUpdateStatus, setListUpdateStatus] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (adminCoupons !== undefined && listUpdateStatus === false) {
        return
      }
      const couponsResult = await coupons({ pageSize, current })
      if (couponsResult === undefined) {
        return
      }
      setTotal(couponsResult.total)
      setAdminCoupons(couponsResult.data)
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
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  setModalCouponVisible(true)
                }}
              >
                <PlusOutlined style={{ verticalAlign: '0.05rem' }} />
                <span>{intl.formatMessage({ id: 'module.coupon.add_btn' })}</span>
              </Button>
            </div>
          </div>
          <List
            total={total}
            pageSize={pageSize}
            current={current}
            dataSource={adminCoupons as []}
            plans={adminPlans as API.Admin.PlanItem[]}
            onChange={(currentValue: number, pageSizeValue: number) => {
              setCurrent(currentValue)
              setPageSize(pageSizeValue)
              setListUpdateStatus(true)
            }}
            onDropSuccess={() => {
              setListUpdateStatus(true)
            }}
            onEditSuccess={() => {
              setListUpdateStatus(true)
            }}
          />
        </div>
      </div>
      {adminPlans !== undefined && (
        <ModalCoupon
          visible={modalCouponVisible}
          onCancel={() => {
            setModalCouponVisible(false)
          }}
          onSubmitSuccess={() => {
            setListUpdateStatus(true)
            setModalCouponVisible(false)
          }}
          plans={adminPlans}
        />
      )}
    </>
  )
}
export default CouponPage
