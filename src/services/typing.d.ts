declare namespace API {
  namespace Passport {
    interface LoginParams {
      email: string
      password: string
    }

    interface LoginResult {
      data: {
        token: string
        auth_data: string
        is_admin: boolean
      }
    }

    interface CheckAuthResult {
      data: {
        is_login: boolean
        is_admin: boolean
      }
    }
  }

  namespace User {
    interface InfoItem {
      balance: number
      banned: number
      commission_balance: number
      commission_rate: number | null
      created_at: number
      discount: number | null
      email: string
      expired_at: number | null
      last_login_at: number | null
      plan_id: number | null
      remind_expire: number
      remind_traffic: number
      telegram_id: number
      transfer_enable: number
    }

    interface InfoResult {
      data: InfoItem
    }

    interface LogoutResult {
      data: boolean
    }
  }

  namespace Admin {
    interface StatResult {
      data: {
        commission_pending_total: number
        day_income: number
        last_month_income: number
        month_income: number
        month_register_total: number
        ticket_pendding_total: number
      }
    }

    interface OrderStatItem {
      type: string
      date: string
      value: number
    }

    interface OrderStatResult {
      data: OrderStatItem[]
    }

    interface ServerLastRankItem {
      server_id: number
      server_type: string
      server_name: string
      u: number
      d: number
    }

    interface ServerLastRankResult {
      data: ServerLastRankItem[]
    }

    interface ConfigsResult {
      data: {
        site: {
          app_description?: string
          app_name: string
          app_url?: string
          email_gmail_limit_enable: number
          email_verify: number
          email_whitelist_enable: boolean
          email_whitelist_suffix: string[]
          recaptcha_enable: number
          recaptcha_key?: string
          recaptcha_site_key?: string
          safe_mode_enable: number
          stop_register: number
          subscribe_url?: string
          tos_url?: string
          try_out_plan_id: number
          try_out_hour: number
        }
        invite: {
          invite_force: number
          invite_commission: number
          invite_gen_limit: number
          invite_never_expire: number
          commission_first_time_enable: number
          commission_auto_check_enable: number
          commission_withdraw_limit: number
          commission_withdraw_method: string
          withdraw_close_enable: number
        }
        subscribe: {
          plan_change_enable: number
          reset_traffic_method: number
          surplus_enable: number
          new_order_event_id: number
          renew_order_event_id: number
          change_order_event_id: number
        }
        frontend: {
          frontend_theme_sidebar: string
          frontend_theme_header: string
          frontend_theme_color: string
          frontend_background_url: string
          frontend_admin_path: string
          frontend_customer_service_method: string
          frontend_customer_service_id?: string
        }
        telegram: {
          telegram_bot_enable: number
          telegram_bot_token?: string
        }
        app: {
          windows_version?: string
          windows_download_url?: string
          macos_version?: string
          macos_download_url?: string
          android_version?: string
          android_download_url?: string
        }
        email: {
          email_template: string
          email_host?: string
          email_port?: number
          email_username?: string
          email_password?: string
          email_encryption?: string
          email_from_address?: string
        }
        server: {
          server_token?: string
          server_license?: string
          server_log_enable: number
          server_v2ray_domain?: string
          server_v2ray_protocol?: string
        }
      }
    }

    interface PlanItem {
      content: string
      count: number
      created_at: number
      group_id: number
      id: number
      month_price: number | null
      name: string
      renew: number
      show: number
      sort: number
      transfer_enable: number
      half_year_price: number | null
      onetime_price: number | null
      reset_price: number | null
      quarter_price: number | null
      three_year_price: number | null
      two_year_price: number | null
      updated_at?: number
      year_price: number | null
    }

    interface PlansResult {
      data: PlanItem[]
    }

    interface PlanUpdateParams {
      id: number
      show?: number
      renew?: number
    }

    interface PlanUpdateResult {
      data: boolean
    }

    interface PlanDropParams {
      id: number
    }

    interface PlanDropResult {
      data: boolean
    }

    interface PlanSortParams {
      plan_ids: number[]
    }

    interface PlanSortResult {
      data: boolean
    }

    interface PlanSaveParams {
      id: number
      name: string
      content: string
      group_id: number
      transfer_enable: string
      month_price: string
      quarter_price: string
      half_year_price: string
      year_price: string
      two_year_price: string
      three_year_price: string
      onetime_price: string
      reset_price: string
    }

    interface PlanSaveResult {
      data: boolean
    }
    type ConfigSaveParams = Record<string, any>

    interface ConfigSaveResult {
      data: boolean
    }

    interface ThemeTemplatesResult {
      data: string[]
    }

    interface EmailTemplatesResult {
      data: string[]
    }

    interface SetTelegramWeboohookParams {
      telegram_bot_token?: string
    }

    interface SetTelegramWeboohookResult {
      data: boolean
    }

    interface PaymentItem {
      config: Record<string, any>
      created_at: number
      enable: number
      id: number
      name: string
      notify_url: string
      payment: string
      sort?: number
      updated_at: number
      uuid: string
    }

    interface PaymentsResult {
      data: PaymentItem[]
    }

    interface PaymentDropParams {
      id: number
    }

    interface PaymentDropResult {
      data: boolean
    }

    interface PaymentMethodsResult {
      data: string[]
    }

    interface PaymentFormParams {
      payment: string
    }

    interface PaymentFormItem {
      description: string
      label: string
      type: string
    }
    interface PaymentFormResult {
      data: Record<string, PaymentFormItem>
    }

    type PaymentSaveParams = Partial<PaymentItem>

    interface PaymentSaveResult {
      data: boolean
    }

    interface GroupItem {
      id: number
      name: string
      created_at: number
      updated_at: number
    }

    interface GroupsResult {
      data: GroupItem[]
    }

    interface GroupDropParams {
      id: number
    }

    interface GroupDropResult {
      data: boolean
    }

    interface NodeItem {
      id: number
      name: string
      parent_id: number
      sort: number
      show: number
      type: string
      created_at: number
      group_id: number[]
      rate: number
      host: string
      port: number
      server_port?: number
      cipher?: string
      updated_at: number
      tags: string[]
      available_status: number
      online: number
      allow_insecure?: number
      server_name?: string
      tls?: number
      network?: string
      network_settings?: any
      tls_settings?: V2rayTlsSettings
      rule_settings?: V2rayRuleSettings
      dns_settings?: V2rayDnsSettingItem[]
    }

    interface NodesResult {
      data: NodeItem[]
    }

    interface NodeUpdateParams {
      id: number
      show: number
    }

    interface NodeUpdateResult {
      data: boolean
    }

    interface NodeDropParams {
      id: number
    }

    interface NodeDropResult {
      data: boolean
    }

    interface NodeCopyParams {
      id: number
    }

    interface NodeCopyResult {
      data: boolean
    }

    interface NodeSortItem {
      key: string
      value: number
    }

    interface NodeSortParams {
      sorts: NodeSortItem[]
    }

    interface NodeSortResult {
      data: boolean
    }

    interface GroupSaveParams {
      id?: number
      name: string
    }

    interface GroupSaveResult {
      data: boolean
    }

    interface ShadowsocksNodeSaveParams {
      group_id: number[]
      tags: string[]
      name: string
      parent_id: number
      host: string
      port: string
      server_port: string
      cipher: string
      rate: string
    }

    interface ShadowsocksNodeSaveResult {
      data: boolean
    }

    interface TrojanNodeSaveParams {
      group_id: number[]
      tags: string[]
      name: string
      parent_id: number
      host: string
      port: string
      server_port: string
      allow_insecure: number
      rate: string
      server_name: string
    }

    interface TrojanNodeSaveResult {
      data: boolean
    }

    interface V2rayDnsSettingItem {
      address: string
      port: number
      domains: string[]
    }

    interface V2rayTlsSettings {
      serverName: string
      allowInsecure: number
    }

    interface V2rayRuleSettings {
      domain: string[]
      protocol: string[]
    }

    interface V2rayNodeSaveParams {
      group_id: number[]
      tags: string[]
      name: string
      parent_id: number
      host: string
      port: string
      server_port: string
      rate: string
      tls: number
      network: string
      alter_id: number
      ruleSettings: V2rayRuleSettings
      dnsSettings: V2rayDnsSettingItem[]
      tlsSettings: V2rayTlsSettings
      networkSettings: any
    }

    interface V2rayNodeSaveResult {
      data: boolean
    }

    interface NoticeItem {
      id: number
      title: string
      img_url: string
      content: string
      created_at: number
      updated_at: number
    }
    interface NoticesResult {
      data: NoticeItem[]
    }

    interface NoticeSaveParams {
      id?: number
      title: string
      content: string
      img_url: string
    }

    interface NoticeSaveResult {
      data: boolean
    }

    interface NoticeDropParams {
      id: number
    }

    interface NoticeDropResult {
      data: boolean
    }

    interface KnowledgeItem {
      id: number
      language: string
      title: string
      body: string
      category: string
      sort: number
      show: number
      created_at: number
      updated_at: number
    }

    interface KnowledgesResult {
      data: KnowledgeItem[]
    }

    interface KnowledgeSortParams {
      knowledge_ids: number[]
    }

    interface KnowledgeSortResult {
      data: boolean
    }

    interface KnowledgeShowParams {
      id: number
    }

    interface KnowledgeShowResult {
      data: boolean
    }

    interface KnowledgeSaveParams {
      id?: number
      title: string
      category: string
      language: string
      body: string
    }

    interface KnowledgeSaveResult {
      data: boolean
    }

    interface KnowledgeDropParams {
      id: number
    }

    interface KnowledgeDropResult {
      data: boolean
    }

    interface TicketItem {
      created_at: number
      updated_at: number
      id: number
      level: number
      subject: string
      last_replay_user_id: number
      status: number
      user_id: number
    }

    interface TicketsParams {
      pageSize: number
      current: number
      status: number
    }

    interface TicketsResult {
      data: TicketItem[]
      total: number
    }

    interface TicketCloseParams {
      id: number
    }

    interface TicketCloseResult {
      data: boolean
    }

    type TicketUnionItem = TicketItem & {
      message: TicketMessageItem[]
    }

    interface TicketMessageItem {
      id: number
      user_id: number
      ticket_id: number
      message: string
      created_at: number
      updated_at: number
      is_me: boolean
    }

    interface TicketParams {
      id: number
    }

    interface TicketResult {
      data: TicketUnionItem
    }

    interface TicketReplyParams {
      id: number
      message: string
    }

    interface TicketReplyResult {
      id: number
      message: string
    }

    interface UserInfoParams {
      id: number
    }

    interface UserInfoResult {
      data: API.User.InfoItem
    }

    interface UserItem {
      id: number
      password: string
      password_algo: string | null
      invite_user_id: number | null
      commission_type: number
      group_id: number
      is_admin: number
      is_staff: number
      plan_name?: string
      last_login_at: number | null
      last_login_ip: string | null
      remarks: string | null
      t: number
      u: number
      d: number
      discount: number | null
      token: string
      uuid: string
      updated_at: number
      subscribe_url: string
    }

    interface UsersParams {
      filter?: API.Admin.UserFilterItem[]
      pageSize: number
      current: number
      sort?: string
      sort_type?: string
    }

    interface UsersResult {
      data: (UserItem & API.User.InfoItem)[]
      total: number
    }

    interface FilterItem {
      key: string
      condition: string
      value: string
    }

    type UserFilterItem = FilterItem

    interface UserDumpCSVParams {
      filter?: UserFilterItem[]
    }

    interface UserSendMailParams {
      filter?: UserFilterItem[]
      subject: string
      content: string
    }

    interface UserSendMailResult {
      data: boolean
    }

    interface UserGenerateParams {
      generate_count?: number
      email_suffix: string
      email_prefix?: string
      password?: string
      plan_id?: number
      expired_at?: number
    }

    interface UserGenerateResult {
      data?: boolean
    }

    interface UserBatchBanParams {
      filter: UserFilterItem[]
    }

    interface UserBatchBanResult {
      data: boolean
    }

    interface UserUpdateParams {
      id: number
      email: string
      password: string | null
      plan_id: number | null
      transfer_enable: number | null
      banned: number
      commission_rate: number | null
      discount: number | null
      is_admin: number
      is_staff: number
      u: number
      d: number
      balance: number
      expired_at: number | null
      commission_type: number
      remarks: string | null
    }

    interface UserUpdateResult {
      data: boolean
    }

    interface UserResetSecertParams {
      id: number
    }

    interface UserResetSecertResult {
      data: boolean
    }

    interface OrderAssignParams {
      email: string
      plan_id: number
      cycle: string
      total_amount: number
    }

    interface OrderAssignResult {
      data: string
    }

    interface CouponsParams {
      pageSize: number
      current: number
    }

    interface CouponItem {
      code: string
      created_at: number
      ended_at: number
      id: number
      limit_plan_ids: number[] | null
      limit_use: number | null
      limit_use_with_user: number | null
      name: string
      started_at: number
      type: number
      updated_at: number
      value: number
    }

    interface CouponsResult {
      data: CouponItem[]
      total: number
    }

    interface CouponDropParams {
      id: number
    }

    interface CouponDropResult {
      data: boolean
    }

    interface CouponGenerateParams {
      id: number
      generate_count: number | null
      name: string
      type: number
      value: number
      startd_at: number
      ended_at: number
      limit_use: number | null
      limit_use_with_user: number | null
      limit_plan_ids: number[] | null
      code: string
    }

    interface CouponGenerateResult {
      data: boolean
    }

    interface OrderItem {
      balance_amount: null | number
      callback_no: null | number
      commission_balance: number
      commission_status: number
      coupon_id: null | number
      created_at: number
      cycle: string
      discount_amount: null | number
      id: number
      invite_user_id: number
      paid_at: null | number
      payment_id: number
      plan_id: number
      refund_amount: null | number
      status: number
      surplus_amount: null | number
      surplus_order_ids: null | number[]
      total_amount: number
      trade_no: string
      type: number
      updated_at: number
      user_id: number
    }

    type OrderFilterItem = FilterItem

    interface OrdersParams {
      pageSize: number
      current: number
      filter?: OrderFilterItem[]
    }

    interface OrdersResult {
      data: OrderItem[]
      total: number
    }

    interface OrderPaidParams {
      trade_no: string
    }

    interface OrderPaidResult {
      data: boolean
    }

    interface OrderCancelParams {
      trade_no: string
    }

    interface OrderCancelResult {
      data: boolean
    }

    interface OrderUpdateParams {
      trade_no: string
      commission_status: number
    }

    interface OrderUpdateResult {
      data: boolean
    }
  }

  namespace Horizon {
    interface StatusResult {
      jobsPerMinute: number
      processes: number
      queueWithMaxRuntime: string
      queueWithMaxThroughput: string
      failedJobs: number
      status: string
      wait: any[]
      peridos: {
        failedJobs: number
        recentJobs: number
      }
    }
  }
}
