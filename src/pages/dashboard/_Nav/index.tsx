import type { FC } from 'react'
import { Link, useIntl } from 'umi'

const Nav: FC = () => {
  const intl = useIntl()
  return (
    <>
      <div className="mb-0 block border-bottom js-classic-nav d-none d-sm-block">
        <div className="block-content block-content-full">
          <div className="row no-gutters border">
            <div
              className="col-sm-6 col-xl-3 js-appear-enabled animated fadeIn"
              data-toggle="appear"
            >
              <Link
                className="block block-bordered block-link-pop text-center mb-0"
                to="/config/system"
              >
                <div className="block-content block-content-full text-center">
                  <i className="fa-2x si si-equalizer text-primary d-none d-sm-inline-block mb-3" />
                  <div className="font-w600 text-uppercase">
                    {intl.formatMessage({ id: 'module.config.system' })}
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-sm-6 col-xl-3 js-appear-enabled animated fadeIn"
              data-toggle="appear"
            >
              <Link className="block block-bordered block-link-pop text-center mb-0" to="/order">
                <div className="block-content block-content-full text-center">
                  <i className="fa-2x si si-list text-primary d-none d-sm-inline-block mb-3" />
                  <div className="font-w600 text-uppercase">
                    {intl.formatMessage({ id: 'module.order' })}
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-sm-6 col-xl-3 js-appear-enabled animated fadeIn"
              data-toggle="appear"
            >
              <Link className="block block-bordered block-link-pop text-center mb-0" to="/plan">
                <div className="block-content block-content-full text-center">
                  <i className="fa-2x si si-bag text-primary d-none d-sm-inline-block mb-3" />
                  <div className="font-w600 text-uppercase">
                    {intl.formatMessage({ id: 'module.plan' })}
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-sm-6 col-xl-3 js-appear-enabled animated fadeIn"
              data-toggle="appear"
            >
              <Link className="block block-bordered block-link-pop text-center mb-0" to="/user">
                <div className="block-content block-content-full text-center">
                  <i className="fa-2x si si-users text-primary d-none d-sm-inline-block mb-3" />
                  <div className="font-w600 text-uppercase">
                    {intl.formatMessage({ id: 'module.user' })}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Nav
