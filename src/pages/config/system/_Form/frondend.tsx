import './style.less'
import type { FC } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'

export interface FormFrontendProps {
  themeTemplates: string[]
  frontendAdminPath: string
  frontendThemeSidebar: boolean
  frontendThemeHeader: boolean
  frontendThemeColor: string
  frontendBackgroundUrl: string
  frontendCustomerServiceMethod: string
  frontendCustomerServiceID: string
  onChange: (data: Record<string, any>) => void
}

const FormFrontend: FC<Partial<FormFrontendProps>> = (props) => {
  const {
    themeTemplates,
    frontendAdminPath,
    frontendThemeSidebar,
    frontendThemeHeader,
    frontendThemeColor,
    frontendBackgroundUrl,
    frontendCustomerServiceMethod,
    frontendCustomerServiceID,
    onChange,
  } = props
  const frontendAdminPathRef = useRef<HTMLInputElement>(null)
  const frontendThemeSidebarRef = useRef<HTMLButtonElement>(null)
  const frontendThemeHeaderRef = useRef<HTMLButtonElement>(null)
  const frontendThemeColorRef = useRef<HTMLSelectElement>(null)
  const frontendBackgroundUrlRef = useRef<HTMLInputElement>(null)
  const frontendCustomerServiceMethodRef = useRef<HTMLSelectElement>(null)
  const frontendCustomerServiceIDRef = useRef<HTMLInputElement>(null)
  const [displayCustomerServiceID, setDisplayCustomerServiceID] = useState<boolean>(
    frontendCustomerServiceMethod !== '0',
  )

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        frontend_admin_path: frontendAdminPathRef.current?.value,
        frontend_theme_sidebar:
          frontendThemeSidebarRef.current?.ariaChecked === 'true' ? 'light' : 'dark',
        frontend_theme_header:
          frontendThemeHeaderRef.current?.ariaChecked === 'true' ? 'light' : 'dark',
        frontend_theme_color: frontendThemeColorRef.current?.value,
        frontend_background_url: frontendBackgroundUrlRef.current?.value,
        frontend_customer_service_method: frontendCustomerServiceMethodRef.current?.value,
        frontend_customer_service_id: frontendCustomerServiceIDRef.current?.value,
      }
      if (data.frontend_customer_service_method === '0') {
        setDisplayCustomerServiceID(false)
      } else {
        setDisplayCustomerServiceID(true)
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  const intl = useIntl()
  return (
    <>
      <div className="block-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">
                {intl.formatMessage({ id: 'module.config.system.frondend.warning' })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_theme' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_theme.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select className="form-control" defaultValue={'v2board'}>
              {themeTemplates?.map((theme: string) => {
                return (
                  <option value={theme} key={theme}>
                    {theme}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_admin_path' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_admin_path.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="admin"
              defaultValue={frontendAdminPath}
              ref={frontendAdminPathRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_theme_sidebar' })}
            </div>
            <div className="font-size-sm my-1" />
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              checkedChildren={intl.formatMessage({ id: 'module.config.system.frondend.light' })}
              unCheckedChildren={intl.formatMessage({ id: 'module.config.system.frondend.dark' })}
              defaultChecked={frontendThemeSidebar}
              onChange={changeHandler}
              ref={frontendThemeSidebarRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_theme_header' })}
            </div>
            <div className="font-size-sm my-1" />
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              checkedChildren={intl.formatMessage({ id: 'module.config.system.frondend.light' })}
              unCheckedChildren={intl.formatMessage({ id: 'module.config.system.frondend.dark' })}
              defaultChecked={frontendThemeHeader}
              onChange={changeHandler}
              ref={frontendThemeHeaderRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.frondend.frontend_theme_color' })}
            </div>
            <div className="font-size-sm my-1" />
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              defaultValue={frontendThemeColor}
              ref={frontendThemeColorRef}
              onChange={changeHandler}
            >
              <option value="default">
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_theme_color.option.default',
                })}
              </option>
              <option value="black">
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_theme_color.option.black',
                })}
              </option>
              <option value="darkblue">
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_theme_color.option.darkblue',
                })}
              </option>
              <option value="green">
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_theme_color.option.green',
                })}
              </option>
            </select>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.frondend.frontend_background_url',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.frondend.frontend_background_url.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="https://xxxxx.com/wallpaper.png"
              defaultValue={frontendBackgroundUrl}
              ref={frontendBackgroundUrlRef}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.frondend.frontend_customer_service_method',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.frondend.frontend_customer_service_method.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <select
              className="form-control"
              defaultValue={frontendCustomerServiceMethod}
              onChange={changeHandler}
              ref={frontendCustomerServiceMethodRef}
            >
              <option value={0}>
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_customer_service_method.option.close',
                })}
              </option>
              <option value="crisp">
                {intl.formatMessage({
                  id: 'module.config.system.frondend.frontend_customer_service_method.option.crisp',
                })}
              </option>
            </select>
          </div>
        </div>
        <div
          className="row v2board-config-children p-4 border-bottom"
          style={displayCustomerServiceID ? {} : { display: 'none' }}
        >
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({
                id: 'module.config.system.frontend.frontend_customer_service_id',
              })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({
                id: 'module.config.system.frontend.frontend_customer_service_id.tip',
              })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.frontend.frontend_customer_service_id.placeholder',
              })}
              defaultValue={frontendCustomerServiceID}
              onChange={changeHandler}
              ref={frontendCustomerServiceIDRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormFrontend
