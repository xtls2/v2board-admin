import type { FC, ChangeEvent } from 'react'
import { Drawer, Input } from 'antd'
import { useIntl } from 'umi'
import { useState } from 'react'

const { TextArea } = Input

export interface drawerRuleProps {
  onClose: (data: API.Admin.V2rayRuleSettings) => void
  visible: boolean
  defaultSettings?: API.Admin.V2rayRuleSettings
}

const DrawerRule: FC<drawerRuleProps> = (props) => {
  const { onClose, visible, defaultSettings } = props
  const [domainValue, setDomainValue] = useState('')
  const [protocolValue, setProtocolValue] = useState('')
  const intl = useIntl()

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.server.manage.v2ray.rule_settings.drawer.title' })}
        placement="right"
        onClose={() => {
          if (domainValue.length === 0 && protocolValue.length === 0) {
            onClose({} as API.Admin.V2rayRuleSettings)
            return
          }
          const settings: API.Admin.V2rayRuleSettings = {
            domain: domainValue.split('\n'),
            protocol: protocolValue.split('\n'),
          }
          onClose(settings)
        }}
        visible={visible}
        width="500"
      >
        <div className="form-group">
          <label>
            {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.domain' })}
          </label>
          <TextArea
            rows={5}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDomainValue(e.target.value)
            }}
            defaultValue={defaultSettings && defaultSettings.domain.join('\n')}
          />
        </div>
        <div className="form-group">
          <label>
            {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.protocol' })}
          </label>
          <TextArea
            rows={5}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setProtocolValue(e.target.value)
            }}
            defaultValue={defaultSettings && defaultSettings.protocol.join('\n')}
          />
        </div>
      </Drawer>
    </>
  )
}

export default DrawerRule
