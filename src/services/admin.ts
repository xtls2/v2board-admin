import { request } from 'umi'
import { apiContentType } from '@/default'
import { stringify } from 'qs'

export async function stat(options?: Record<string, any>) {
  return request<API.Admin.StatResult>('/api/v1/admin/stat/getOverride', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function orderStat(options?: Record<string, any>) {
  return request<API.Admin.OrderStatResult>('/api/v1/admin/stat/getOrder', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function serverLastRank(options?: Record<string, any>) {
  return request<API.Admin.ServerLastRankResult>('/api/v1/admin/stat/getServerLastRank', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function configs(options?: Record<string, any>) {
  return request<API.Admin.ConfigsResult>('/api/v1/admin/config/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function plans(options?: Record<string, any>) {
  return request<API.Admin.PlansResult>('/api/v1/admin/plan/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function planUpdate(body: API.Admin.PlanUpdateParams, options?: Record<string, any>) {
  return request<API.Admin.PlanUpdateResult>('api/v1/admin/plan/update', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function planDrop(body: API.Admin.PlanDropParams, options?: Record<string, any>) {
  return request<API.Admin.PlanDropParams>('/api/v1/admin/plan/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function planSort(body: API.Admin.PlanSortParams, options?: Record<string, any>) {
  return request<API.Admin.PlanSortResult>('/api/v1/admin/plan/sort', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function planSave(
  body: Partial<API.Admin.PlanSaveParams>,
  options?: Record<string, any>,
) {
  return request<API.Admin.PlanSaveResult>('/api/v1/admin/plan/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function configSave(body: API.Admin.ConfigSaveParams, options?: Record<string, any>) {
  return request<API.Admin.ConfigSaveResult>('/api/v1/admin/config/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function themeTemplates(options?: Record<string, any>) {
  return request<API.Admin.ThemeTemplatesResult>('/api/v1/admin/config/getThemeTemplate', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function emailTemplates(options?: Record<string, any>) {
  return request<API.Admin.EmailTemplatesResult>('/api/v1/admin/config/getEmailTemplate', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function setTelegramWebhook(
  body: API.Admin.SetTelegramWeboohookParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.SetTelegramWeboohookResult>('/api/v1/admin/config/setTelegramWebhook', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function payments(options?: Record<string, any>) {
  return request<API.Admin.PaymentsResult>('/api/v1/admin/payment/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function paymentDrop(
  body: API.Admin.PaymentDropParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.PaymentDropResult>('/api/v1/admin/payment/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function paymentMethods(options?: Record<string, any>) {
  return request<API.Admin.PaymentMethodsResult>('/api/v1/admin/payment/getPaymentMethods', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function paymentForm(
  body: API.Admin.PaymentFormParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.PaymentFormResult>('/api/v1/admin/payment/getPaymentForm', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function paymentSave(
  body: API.Admin.PaymentSaveParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.PaymentSaveResult>('/api/v1/admin/payment/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function groups(options?: Record<string, any>) {
  return request<API.Admin.GroupsResult>('/api/v1/admin/server/group/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function nodes(options?: Record<string, any>) {
  return request<API.Admin.NodesResult>('/api/v1/admin/server/manage/getNodes', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function nodeUpdate(
  type: string,
  body: API.Admin.NodeUpdateParams,
  options?: Record<string, any>,
) {
  const uri = `/api/v1/admin/server/${type}/update`

  return request<API.Admin.NodeUpdateResult>(uri, {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function nodeDrop(
  type: string,
  body: API.Admin.NodeDropParams,
  options?: Record<string, any>,
) {
  const uri = `/api/v1/admin/server/${type}/drop`

  return request<API.Admin.NodeDropResult>(uri, {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function nodeCopy(
  type: string,
  body: API.Admin.NodeCopyParams,
  options?: Record<string, any>,
) {
  const uri = `/api/v1/admin/server/${type}/copy`

  return request<API.Admin.NodeCopyResult>(uri, {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function nodeSort(body: API.Admin.NodeSortParams, options?: Record<string, any>) {
  return request<API.Admin.NodeSortResult>('/api/v1/admin/server/manage/sort', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function groupSave(body: API.Admin.GroupSaveParams, options?: Record<string, any>) {
  return request<API.Admin.GroupSaveResult>('/api/v1/admin/server/group/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function groupDrop(body: API.Admin.GroupDropParams, options?: Record<string, any>) {
  return request<API.Admin.GroupDropResult>('/api/v1/admin/server/group/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function shodowsocksNodeSave(
  body: Partial<API.Admin.ShadowsocksNodeSaveParams>,
  options?: Record<string, any>,
) {
  return request<API.Admin.ShadowsocksNodeSaveResult>('/api/v1/admin/server/shadowsocks/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function trojanNodeSave(
  body: Partial<API.Admin.TrojanNodeSaveParams>,
  options?: Record<string, any>,
) {
  return request<API.Admin.TrojanNodeSaveResult>('/api/v1/admin/server/trojan/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function V2rayNodeSave(
  body: Partial<API.Admin.V2rayNodeSaveParams>,
  options?: Record<string, any>,
) {
  return request<API.Admin.V2rayNodeSaveResult>('/api/v1/admin/server/v2ray/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function notices(options?: Record<string, any>) {
  return request<API.Admin.NoticesResult>('/api/v1/admin/notice/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function noticeSave(body: API.Admin.NoticeSaveParams, options?: Record<string, any>) {
  return request<API.Admin.NoticeSaveResult>('/api/v1/admin/notice/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function noticeDrop(body: API.Admin.NoticeDropParams, options?: Record<string, any>) {
  return request<API.Admin.NoticeDropResult>('/api/v1/admin/notice/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function knowledges(options?: Record<string, any>) {
  return request<API.Admin.KnowledgesResult>('/api/v1/admin/knowledge/fetch', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function knowledgeSort(
  body: API.Admin.KnowledgeSortParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.KnowledgeSortResult>('/api/v1/admin/knowledge/sort', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function knowledgeShow(
  body: API.Admin.KnowledgeShowParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.KnowledgeShowResult>('/api/v1/admin/knowledge/show', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function knowledgeSave(
  body: API.Admin.KnowledgeSaveParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.KnowledgeSaveResult>('/api/v1/admin/knowledge/save', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function knowledgeDrop(
  body: API.Admin.KnowledgeDropParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.KnowledgeDropResult>('/api/v1/admin/knowledge/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function tickets(params: API.Admin.TicketsParams, options?: Record<string, any>) {
  return request<API.Admin.TicketsResult>('/api/v1/admin/ticket/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function ticketClose(
  body: API.Admin.TicketCloseParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.TicketCloseResult>('/api/v1/admin/ticket/close', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function ticket(params: API.Admin.TicketParams, options?: Record<string, any>) {
  return request<API.Admin.TicketResult>('/api/v1/admin/ticket/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function ticketReply(
  body: API.Admin.TicketReplyParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.TicketReplyResult>('/api/v1/admin/ticket/reply', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function userInfo(params: API.Admin.UserInfoParams, options?: Record<string, any>) {
  return request<API.Admin.UserInfoResult>('/api/v1/admin/user/getUserInfoById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function users(params: API.Admin.UsersParams, options?: Record<string, any>) {
  return request<API.Admin.UsersResult>('/api/v1/admin/user/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    paramsSerializer: (urlParams) => stringify(urlParams, {}),
    ...(options || {}),
  })
}

export async function userDumpCSV(
  body: API.Admin.UserDumpCSVParams,
  options?: Record<string, any>,
) {
  return request('/api/v1/admin/user/dumpCSV', {
    method: 'POST',
    responseType: 'blob',
    parseResponse: true,
    data: body,
    ...(options || {}),
  })
}

export async function userSendMail(
  body: API.Admin.UserSendMailParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.UserSendMailResult>('/api/v1/admin/user/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function userGenerate(
  body: API.Admin.UserGenerateParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.UserGenerateResult>('/api/v1/admin/user/generate', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function userBatchBan(
  body: API.Admin.UserBatchBanParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.UserBatchBanResult>('/api/v1/admin/user/ban', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function userUpdate(body: API.Admin.UserUpdateParams, options?: Record<string, any>) {
  return request<API.Admin.UserUpdateResult>('/api/v1/admin/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function userResetSecret(
  body: API.Admin.UserResetSecertParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.UserUpdateResult>('/api/v1/admin/user/resetSecret', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orderAssign(
  body: API.Admin.OrderAssignParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.OrderAssignResult>('/api/v1/admin/order/assign', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function coupons(params: API.Admin.CouponsParams, options?: Record<string, any>) {
  return request<API.Admin.CouponsResult>('/api/v1/admin/coupon/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    paramsSerializer: (urlParams) => stringify(urlParams, {}),
    ...(options || {}),
  })
}

export async function couponDrop(body: API.Admin.CouponDropParams, options?: Record<string, any>) {
  return request<API.Admin.CouponDropResult>('/api/v1/admin/coupon/drop', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function couponGenerate(
  body: Partial<API.Admin.CouponGenerateParams>,
  options?: Record<string, any>,
) {
  return request<API.Admin.CouponGenerateResult>('/api/v1/admin/coupon/generate', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orders(params: API.Admin.OrdersParams, options?: Record<string, any>) {
  return request<API.Admin.OrdersResult>('/api/v1/admin/order/fetch', {
    method: 'GET',
    params: {
      ...params,
    },
    paramsSerializer: (urlParams) => stringify(urlParams, {}),
    ...(options || {}),
  })
}

export async function orderPaid(body: API.Admin.OrderPaidParams, options?: Record<string, any>) {
  return request<API.Admin.OrderPaidResult>('/api/v1/admin/order/paid', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orderCancel(
  body: API.Admin.OrderCancelParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.OrderCancelResult>('/api/v1/admin/order/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function orderUpdate(
  body: API.Admin.OrderUpdateParams,
  options?: Record<string, any>,
) {
  return request<API.Admin.OrderUpdateResult>('/api/v1/admin/order/update', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}
