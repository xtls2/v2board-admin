import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'umi'
import { Switch, Button, message } from 'antd'
import { useDebounceFn } from 'ahooks'
import { useRef, useState } from 'react'
import { setTelegramWebhook } from '@/services'

export interface formTelegramProps {
  telegramBotEnable: boolean
  telegramBotToken: string
  onChange: (data: Record<string, any>) => void
}

const FormTelegram: FC<Partial<formTelegramProps>> = (props) => {
  const { telegramBotEnable, telegramBotToken, onChange } = props
  const telegramBotEnableRef = useRef<HTMLButtonElement>(null)
  const telegramBotTokenRef = useRef<HTMLInputElement>(null)
  const [hookLoading, sethookLoading] = useState(false)
  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        telegram_bot_enable: telegramBotEnableRef.current?.ariaChecked === 'true' ? 1 : 0,
        telegram_bot_token: telegramBotTokenRef.current?.value,
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const setWebhookHandler = async () => {
    sethookLoading(true)
    const setTelegramWebhookResult = await setTelegramWebhook({})
    sethookLoading(false)
    if (setTelegramWebhookResult === undefined) {
      return
    }
    message.success(
      intl.formatMessage({
        id: 'module.config.system.telegram.telegram_set_webhook.message.success',
      }),
    )
  }

  const changeHandler = run
  return (
    <>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_bot_token' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_bot_token.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="0000000000:xxxxxxxxx_xxxxxxxxxxxxxxx"
              defaultValue={telegramBotToken}
              onChange={changeHandler}
              ref={telegramBotTokenRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_set_webhook' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_set_webhook.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Button
              type="primary"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                setWebhookHandler()
              }}
              loading={hookLoading}
            >
              {intl.formatMessage({
                id: 'module.config.system.telegram.telegram_set_webhook.btn',
              })}
            </Button>
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_bot_enable' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.telegram.telegram_bot_enable.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <Switch
              defaultChecked={telegramBotEnable}
              onChange={changeHandler}
              ref={telegramBotEnableRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormTelegram
