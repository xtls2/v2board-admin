import './style.less'
import type { FC } from 'react'
import { Tabs, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import FormSite from './_Form/site'
import type { formSiteProps } from './_Form/site'
import { configs, configSave, plans, emailTemplates, themeTemplates } from '@/services'
import { useIntl } from 'umi'
import FormSubscribe from './_Form/subscribe'
import type { formSubscribeProps } from './_Form/subscribe'
import type { formInviteProps } from './_Form/invite'
import FormInvite from './_Form/invite'
import FormFrontend from './_Form/frondend'
import type { FormFrontendProps } from './_Form/frondend'
import FormServer from './_Form/server'
import type { formServerProps } from './_Form/server'
import FormEmail from './_Form/email'
import type { formEmailProps } from './_Form/email'
import FormTelegram from './_Form/telegram'
import type { formTelegramProps } from './_Form/telegram'
import FormApp from './_Form/app'
import type { formAppProps } from './_Form/app'

const { TabPane } = Tabs

const ConfigSystemPage: FC = () => {
  const [siteProps, setSiteProps] = useState<formSiteProps>()
  const [inviteProps, setInviteProps] = useState<formInviteProps>()
  const [subscribeProps, setSubscribeProps] = useState<formSubscribeProps>()
  const [frontendProps, setFrontendProps] = useState<FormFrontendProps>()
  const [serverProps, setServerProps] = useState<formServerProps>()
  const [emailProps, setEmailProps] = useState<formEmailProps>()
  const [telegramProps, setTelegramProps] = useState<formTelegramProps>()
  const [appProps, setAppProps] = useState<formAppProps>()

  const intl = useIntl()

  const saveHandler = async (data: Record<string, any>) => {
    const configSaveResult = await configSave(data)
    if (configSaveResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'module.config.system.message.sava_success' }))
  }

  useEffect(() => {
    ;(async () => {
      const plansResult = await plans()
      if (plansResult === undefined) {
        return
      }

      const themeTemplatesResult = await themeTemplates()
      if (themeTemplatesResult === undefined) {
        return
      }

      const emailTemplatesResult = await emailTemplates()
      if (emailTemplatesResult === undefined) {
        return
      }

      const configsResult = await configs()
      if (configsResult === undefined) {
        return
      }
      setSiteProps({
        appName: configsResult.data.site.app_name,
        appUrl: configsResult.data.site.app_url ?? '',
        appDescription: configsResult.data.site.app_description ?? '',
        subscribeUrl: configsResult.data.site.subscribe_url ?? '',
        tosUrl: configsResult.data.site.tos_url ?? '',
        safeModeEnable: Boolean(configsResult.data.site.safe_mode_enable).valueOf(),
        stopRegister: Boolean(configsResult.data.site.stop_register).valueOf(),
        emailVerify: Boolean(configsResult.data.site.email_verify).valueOf(),
        emailGmailLimitEnable: Boolean(configsResult.data.site.email_gmail_limit_enable).valueOf(),
        tryOutPlanID: configsResult.data.site.try_out_plan_id,
        planItems: plansResult.data,
        emailWhiteListEnable: Boolean(configsResult.data.site.email_whitelist_enable),
        emailWhiteListSuffix: configsResult.data.site.email_whitelist_suffix,
        recaptchaEnable: Boolean(configsResult.data.site.recaptcha_enable),
        recaptchaKey: configsResult.data.site.recaptcha_key ?? '',
        recaptchaSiteKey: configsResult.data.site.recaptcha_site_key ?? '',
        onChange: saveHandler,
      })

      setSubscribeProps({
        planChangeEnable: Boolean(configsResult.data.subscribe.plan_change_enable).valueOf(),
        resetTrafficMethod: configsResult.data.subscribe.reset_traffic_method,
        surplusEnable: Boolean(configsResult.data.subscribe.surplus_enable).valueOf(),
        newOrderEventID: configsResult.data.subscribe.new_order_event_id,
        renewOrderEventID: configsResult.data.subscribe.renew_order_event_id,
        changeOrderEventID: configsResult.data.subscribe.change_order_event_id,
        onChange: saveHandler,
      })

      setInviteProps({
        inviteForce: Boolean(configsResult.data.invite.invite_force).valueOf(),
        inviteCommission: configsResult.data.invite.invite_commission,
        inviteGenlLimit: configsResult.data.invite.invite_gen_limit,
        inviteNeverExpire: Boolean(Number(configsResult.data.invite.invite_never_expire).valueOf()),
        commissionFirstTimeEnable: Boolean(configsResult.data.invite.commission_first_time_enable),
        commissionWithdrawLimit: configsResult.data.invite.commission_withdraw_limit,
        commissionAutoCheckEnable: Boolean(configsResult.data.invite.commission_auto_check_enable),
        commissionWithdrawMethod: configsResult.data.invite.commission_withdraw_method,
        withdrawCloseEnable: Boolean(configsResult.data.invite.withdraw_close_enable),
        onChange: saveHandler,
      })

      setFrontendProps({
        themeTemplates: themeTemplatesResult.data,
        frontendAdminPath: configsResult.data.frontend.frontend_admin_path,
        frontendThemeSidebar: configsResult.data.frontend.frontend_theme_sidebar === 'light',
        frontendThemeHeader: configsResult.data.frontend.frontend_theme_header === 'light',
        frontendThemeColor: configsResult.data.frontend.frontend_theme_color,
        frontendBackgroundUrl: configsResult.data.frontend.frontend_background_url,
        frontendCustomerServiceMethod: configsResult.data.frontend.frontend_customer_service_method,
        frontendCustomerServiceID: configsResult.data.frontend
          .frontend_customer_service_id as string,
        onChange: saveHandler,
      })

      setServerProps({
        serverToken: configsResult.data.server.server_token as string,
        serverLicense: configsResult.data.server.server_license as string,
        serverLogEnable: Boolean(configsResult.data.server.server_log_enable).valueOf(),
        serverV2rayDomain: configsResult.data.server.server_v2ray_domain as string,
        serverV2rayProtocol: configsResult.data.server.server_v2ray_protocol as string,
        onChange: saveHandler,
      })

      setEmailProps({
        emailTemplates: emailTemplatesResult.data,
        emailTemplate: configsResult.data.email.email_template,
        emailHost: configsResult.data.email.email_host as string,
        emailPort: String(configsResult.data.email.email_port as number).valueOf(),
        emailUsername: configsResult.data.email.email_username as string,
        emailPassword: configsResult.data.email.email_password as string,
        emailEncryption: configsResult.data.email.email_encryption as string,
        emailFromAddress: configsResult.data.email.email_from_address as string,
        onChange: saveHandler,
      })

      setTelegramProps({
        telegramBotEnable: Boolean(configsResult.data.telegram.telegram_bot_enable).valueOf(),
        telegramBotToken: configsResult.data.telegram.telegram_bot_token as string,
        onChange: saveHandler,
      })

      setAppProps({
        windowsVersion: configsResult.data.app.windows_version as string,
        windowsDownloadUrl: configsResult.data.app.windows_download_url as string,
        macosVersion: configsResult.data.app.macos_version as string,
        macosDownloadUrl: configsResult.data.app.macos_download_url as string,
        androidVersion: configsResult.data.app.android_version as string,
        androidDownloadUrl: configsResult.data.app.android_download_url as string,
        onChange: saveHandler,
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="p-0 p-lg-4">
        <div className="mb-0 block border-bottom">
          <Tabs defaultActiveKey="site" size="large" type="line">
            <TabPane tab={intl.formatMessage({ id: 'module.config.system.site' })} key="site">
              <Spin spinning={siteProps === undefined}>
                <FormSite {...siteProps} />
              </Spin>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({ id: 'module.config.system.subscribe' })}
              key="subscribe"
            >
              <Spin spinning={subscribeProps === undefined}>
                <FormSubscribe {...subscribeProps} />
              </Spin>
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'module.config.system.invite' })} key="invite">
              <Spin spinning={inviteProps === undefined}>
                <FormInvite {...inviteProps} />
              </Spin>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({ id: 'module.config.system.frondend' })}
              key="frondend"
            >
              <Spin spinning={frontendProps === undefined}>
                <FormFrontend {...frontendProps} />
              </Spin>
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'module.config.system.server' })} key="server">
              <Spin spinning={serverProps === undefined}>
                <FormServer {...serverProps} />
              </Spin>
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'module.config.system.email' })} key="email">
              <Spin spinning={emailProps === undefined}>
                <FormEmail {...emailProps} />
              </Spin>
            </TabPane>
            <TabPane
              tab={intl.formatMessage({ id: 'module.config.system.telegram' })}
              key="telegram"
            >
              <Spin spinning={telegramProps === undefined}>
                <FormTelegram {...telegramProps} />
              </Spin>
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'module.config.system.app' })} key="app">
              <Spin spinning={appProps === undefined}>
                <FormApp {...appProps} />
              </Spin>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default ConfigSystemPage
