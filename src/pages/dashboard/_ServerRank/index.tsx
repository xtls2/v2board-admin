import type { FC } from 'react'
import { useIntl } from 'umi'
import ServerRankChart from './_ServerRankChart'

const ServerRank: FC = () => {
  const intl = useIntl()
  return (
    <>
      <div className="col-lg-12 js-appear-enabled animated fadeIn">
        <div className="block border-bottom mb-0">
          <div className="block-header block-header-default">
            <h3 className="block-title">
              {intl.formatMessage({ id: 'module.dashboard.server_last_rank' })}
            </h3>
          </div>
          <div className="block-content">
            <div className="px-sm-3 pt-sm-3 py-3 clearfix" id="serverRankChart">
              <div style={{ position: 'relative' }}>
                <ServerRankChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ServerRank
