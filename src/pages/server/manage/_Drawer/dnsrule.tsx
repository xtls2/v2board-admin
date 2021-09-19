import type { FC, ChangeEvent } from 'react'
import { Drawer, Button, Divider, Input, Space } from 'antd'
import { useIntl } from 'umi'
import { DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { TextArea } = Input

export interface drawerDnsRuleProps {
  onClose: (data: API.Admin.V2rayDnsSettingItem[]) => void
  visible: boolean
  defaultSettings?: API.Admin.V2rayDnsSettingItem[]
}

type settingItem = API.Admin.V2rayDnsSettingItem & { index: number }

const DrawerDNSRule: FC<drawerDnsRuleProps> = (props) => {
  const { onClose, visible, defaultSettings } = props
  const [dnsSettings, setDNSSettings] = useState<settingItem[]>([])

  useEffect(() => {
    if (defaultSettings !== null && defaultSettings !== undefined) {
      const defaultDnsSettings = defaultSettings.map(({ ...p }, index: number) => {
        return { ...p, index: index + 1 }
      })
      setDNSSettings(defaultDnsSettings)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const intl = useIntl()
  const renderElements = () => (
    <>
      {dnsSettings.map((item: settingItem) => (
        <div key={item.index}>
          <div className="row">
            <Divider style={{ backgroundColor: 'unset' }}>
              <Space>
                {`${intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.name' })}(${
                  item.index
                })`}
                <DeleteOutlined
                  style={{ color: '#FF4D4F', verticalAlign: '0.05rem' }}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setDNSSettings((prevSettings) => {
                      const settings = prevSettings.filter(
                        (setting) => setting.index !== item.index,
                      )
                      return settings
                    })
                  }}
                />
              </Space>
            </Divider>

            <div className="form-group col-md-9 col-xs-12">
              <label>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.address' })}
              </label>
              <Input
                placeholder={intl.formatMessage({
                  id: 'module.server.manage.v2ray.dns_settings.address.placeholder',
                })}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newDnsSettings = dnsSettings.map((sourceItem: settingItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.address = e.target.value
                    }
                    return newItem
                  })
                  setDNSSettings(newDnsSettings)
                }}
                defaultValue={item.address}
              />
            </div>
            <div className="form-group col-md-3 col-xs-12">
              <label>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.port' })}
              </label>
              <Input
                type="number"
                placeholder={intl.formatMessage({
                  id: 'module.server.manage.v2ray.dns_settings.port.placeholder',
                })}
                defaultValue={item.port ?? 53}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newDnsSettings = dnsSettings.map((sourceItem: settingItem) => {
                    const newItem = sourceItem
                    if (sourceItem.index === item.index) {
                      newItem.port = Number(e.target.value).valueOf()
                    }
                    return newItem
                  })
                  setDNSSettings(newDnsSettings)
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.domains' })}
            </label>
            <TextArea
              rows={5}
              placeholder={intl.formatMessage({
                id: 'module.server.manage.v2ray.dns_settings.domains.placeholder',
              })}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                const newDnsSettings = dnsSettings.map((sourceItem: settingItem) => {
                  const newItem = sourceItem
                  if (sourceItem.index === item.index) {
                    newItem.domains = e.target.value.split('\n')
                  }
                  return newItem
                })
                setDNSSettings(newDnsSettings)
              }}
              defaultValue={item.domains.join('\n')}
            />
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      <Drawer
        title={intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.drawer.title' })}
        placement="right"
        onClose={() => {
          onClose(
            dnsSettings
              .filter((setting) => setting.address.length !== 0)
              .map(({ index, ...others }) => others),
          )
        }}
        visible={visible}
        width="500"
      >
        <div className="form-group">
          <label>
            {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.drawer.sub_title' })}
          </label>
          {renderElements()}
          <div>
            <Button
              className="w-100"
              type="primary"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                const newDnsSetting = {
                  address: '',
                  port: 53,
                  domains: [],
                  index: dnsSettings.length + 1,
                }
                setDNSSettings([...dnsSettings, newDnsSetting])
              }}
            >
              <span>
                {intl.formatMessage({ id: 'module.server.manage.v2ray.dns_settings.add_btn' })}
              </span>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerDNSRule
