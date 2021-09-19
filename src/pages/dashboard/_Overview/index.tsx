import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { stat } from '@/services'
import { currencyFormatter } from '@/default'
import { useIntl, Link } from 'umi'
import OrderChart from './_OrderChart'
import { Space } from 'antd'

const Overview: FC = () => {
  const [adminStat, setAdminStat] = useState<API.Admin.StatResult>()
  const intl = useIntl()

  useEffect(() => {
    ;(async () => {
      const statResult = await stat()
      if (statResult === undefined) {
        return
      }
      setAdminStat(statResult)
    })()
  }, [])

  return (
    <>
      <div className="col-lg-12 js-appear-enabled animated fadeIn" data-toggle="appear">
        <div className="block border-bottom mb-0">
          <div className="block-content">
            <div className="px-sm-3 pt-sm-3 clearfix">
              <i className="fa fa-chart-line fa-2x text-gray-light float-right" />
              <p className="display-4 text-black font-w300 mb-2">
                {adminStat?.data.day_income !== undefined &&
                  currencyFormatter.format((adminStat?.data.day_income as number) / 100)}
                <span className="font-size-h5 font-w600 text-muted">CNY</span>
              </p>
              <Space>
                {intl.formatMessage({ id: 'module.dashboard.month_income' })}
                {currencyFormatter.format((adminStat?.data.month_income as number) / 100)},
                {intl.formatMessage({ id: 'module.dashboard.last_month_income' })}
                {currencyFormatter.format((adminStat?.data.last_month_income as number) / 100)}。
              </Space>
            </div>
            <div className="px-sm-3 pt-sm-3 py-3 clearfix">
              <div style={{ position: 'relative' }}>
                <OrderChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 js-appear-enabled animated fadeIn" data-toggle="appear">
        <div className="block border-bottom mb-0">
          <div className="block-content block-content-full d-flex align-items-center justify-content-between">
            <div className="ml-3">
              <p className="font-size-h2 font-w300 text-black mb-0">
                {(adminStat?.data.month_register_total as number) > 0
                  ? adminStat?.data.month_register_total
                  : '-'}
              </p>
              <Link
                className="link-fx font-size-sm font-w600 text-muted text-uppercase mb-0"
                to="#"
                onClick={(e: React.MouseEvent) => e.preventDefault()}
              >
                {intl.formatMessage({ id: 'module.dashboard.month_register_total' })}
              </Link>
            </div>
            <div>
              <i className="far si fa-2x si-users text-primary" />
            </div>
          </div>
        </div>
        <div className="block border-bottom mb-0">
          <div className="block-content block-content-full d-flex align-items-center justify-content-between">
            <div className="ml-3">
              <p className="font-size-h2 font-w300 text-black mb-0">
                {(adminStat?.data.ticket_pendding_total as number) > 0
                  ? adminStat?.data.ticket_pendding_total
                  : '-'}
              </p>
              <Link
                className="link-fx font-size-sm font-w600 text-muted text-uppercase mb-0"
                to="#"
                onClick={(e: React.MouseEvent) => e.preventDefault()}
              >
                {intl.formatMessage({ id: 'module.dashboard.ticket_pendding_total' })}
              </Link>
            </div>
            <div>
              <i className="far si fa-2x si-support text-primary" />
            </div>
          </div>
        </div>
        <div className="block border-bottom mb-0">
          <div className="block-content block-content-full d-flex align-items-center justify-content-between">
            <div className="ml-3">
              <p className="font-size-h2 font-w300 text-black mb-0">
                {(adminStat?.data.commission_pending_total as number) > 0
                  ? adminStat?.data.commission_pending_total
                  : '-'}
              </p>
              <Link
                className="link-fx font-size-sm font-w600 text-muted text-uppercase mb-0"
                to="#"
                onClick={(e: React.MouseEvent) => e.preventDefault()}
              >
                {adminStat?.data.commission_pending_total}
              </Link>
            </div>
            <div>
              <i className="far si fa-2x si-user-following text-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview
