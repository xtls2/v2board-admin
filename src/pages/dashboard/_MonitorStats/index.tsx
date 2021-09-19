import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useIntl } from 'umi'
import { stats } from '@/services'

const MonitorStats: FC = () => {
  const [horizonStatus, setHorizonStatus] = useState(true)
  const intl = useIntl()
  useEffect(() => {
    stats().then((statsResult: API.Horizon.StatusResult) => {
      if (statsResult === undefined) {
        return Promise.reject()
      }
      if (statsResult.status === 'inactive') {
        setHorizonStatus(false)
      }
      return Promise.resolve()
    })
  }, [])

  return (
    <>
      {horizonStatus === false && (
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-danger" role="alert">
              <p className="mb-0">
                {intl.formatMessage({ id: 'module.dashboard.monitor_stats.warning' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default MonitorStats
