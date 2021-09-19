import type { FC } from 'react'
import { useIntl, Link } from 'umi'
import { Space } from 'antd'

const NoFoundPage: FC = () => {
  const intl = useIntl()
  return (
    <>
      <div id="page-container">
        <main id="main-container">
          <div className="bg-image">
            <div className="hero bg-white-95">
              <div className="hero-inner">
                <div className="content content-full">
                  <div className="px-3 py-5 text-center">
                    <div className="row">
                      <div className="col-sm-6 text-center text-sm-right">
                        <div className="display-1 text-danger font-w700">404</div>
                      </div>
                      <div className="col-sm-6 text-center d-sm-flex align-items-sm-center">
                        <div className="display-1 text-muted font-w300">Error</div>
                      </div>
                    </div>
                    <div data-class="animated fadeInUp">
                      <Link className="btn btn-hero-secondary" to="/">
                        <Space>
                          <i className="fa fa-arrow-left mr-1" />
                          {intl.formatMessage({ id: 'common.back_home' })}
                        </Space>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default NoFoundPage
