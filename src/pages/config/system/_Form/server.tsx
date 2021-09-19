import type { FC } from 'react'
import { useIntl } from 'umi'
import { Switch } from 'antd'
import { useRef } from 'react'
import { useDebounceFn } from 'ahooks'

export interface formServerProps {
  serverToken: string
  serverLicense: string
  serverLogEnable: boolean
  serverV2rayDomain: string
  serverV2rayProtocol: string
  onChange: (data: Record<string, any>) => void
}

const FormServer: FC<Partial<formServerProps>> = (props) => {
  const intl = useIntl()
  const {
    serverToken,
    serverLicense,
    serverLogEnable,
    serverV2rayDomain,
    serverV2rayProtocol,
    onChange,
  } = props

  const serverTokenRef = useRef<HTMLInputElement>(null)
  const serverLicenseRef = useRef<HTMLTextAreaElement>(null)
  const serverLogEnableRef = useRef<HTMLButtonElement>(null)
  const serverV2rayDomainRef = useRef<HTMLTextAreaElement>(null)
  const serverV2rayProtocolRef = useRef<HTMLTextAreaElement>(null)

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        server_token: serverTokenRef.current?.value,
        server_license: serverLicenseRef.current?.value,
        server_log_enable: serverLogEnableRef.current?.ariaChecked === 'true' ? 1 : 0,
        server_v2ray_domain: serverV2rayDomainRef.current?.value,
        server_v2ray_protocol: serverV2rayProtocolRef.current?.value,
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  return (
    <>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_token' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_token.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.server.server_token.placeholder',
              })}
              defaultValue={serverToken}
              onChange={changeHandler}
              ref={serverTokenRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_license' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_license.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.server.server_license.placeholder',
              })}
              defaultValue={serverLicense}
              onChange={changeHandler}
              ref={serverLicenseRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_log_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_log_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={serverLogEnable}
              onChange={changeHandler}
              ref={serverLogEnableRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_v2ray_domain' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_v2ray_domain.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.server.server_v2ray_domain.placeholder',
              })}
              defaultValue={serverV2rayDomain}
              onChange={changeHandler}
              ref={serverV2rayDomainRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_v2ray_protocol' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.server.server_v2ray_protocol.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <textarea
              rows={4}
              className="form-control"
              placeholder={intl.formatMessage({
                id: 'module.config.system.server.server_v2ray_protocol.placeholder',
              })}
              defaultValue={serverV2rayProtocol}
              onChange={changeHandler}
              ref={serverV2rayProtocolRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormServer
