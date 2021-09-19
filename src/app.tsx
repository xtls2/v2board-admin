import { history, getIntl, getLocale } from 'umi'
import type { RequestConfig } from 'umi'
import { notification } from 'antd'
import { user } from '@/services'
import { loginPath, isNoFetchUserPath, notFoundPath, apiHost } from '@/default'

const intl = getIntl()
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.User.InfoResult
  fetchUserInfo?: () => Promise<API.User.InfoResult>
}> {
  const fetchUserInfo = async () => {
    const currentUser = await user.userInfo()
    return currentUser
  }

  // 如果特殊页面不执行，直接返回函数
  if (!isNoFetchUserPath(history.location.pathname)) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
    }
  }
  return {
    fetchUserInfo,
  }
}

/**
 * 异常处理程序
 200: '服务器成功返回请求的数据。',
 201: '新建或修改数据成功。',
 202: '一个请求已经进入后台排队（异步任务）。',
 204: '删除数据成功。',
 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
 401: '用户没有权限（令牌、用户名、密码错误）。',
 403: '用户得到授权，但是访问是被禁止的。',
 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
 405: '请求方法不被允许。',
 406: '请求的格式不可得。',
 410: '请求的资源被永久删除，且不会再得到的。',
 422: '当创建一个对象时，发生一个验证错误。',
 500: '服务器发生错误，请检查服务器。',
 502: '网关错误。',
 503: '服务不可用，服务器暂时过载或维护。',
 504: '网关超时。',
 //-----English
 200: The server successfully returned the requested data. ',
 201: New or modified data is successful. ',
 202: A request has entered the background queue (asynchronous task). ',
 204: Data deleted successfully. ',
 400: 'There was an error in the request sent, and the server did not create or modify data. ',
 401: The user does not have permission (token, username, password error). ',
 403: The user is authorized, but access is forbidden. ',
 404: The request sent was for a record that did not exist. ',
 405: The request method is not allowed. ',
 406: The requested format is not available. ',
 410':
 'The requested resource is permanently deleted and will no longer be available. ',
 422: When creating an object, a validation error occurred. ',
 500: An error occurred on the server, please check the server. ',
 502: Gateway error. ',
 503: The service is unavailable. ',
 504: The gateway timed out. ',
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
  prefix: apiHost,
  charset: 'utf8',
  credentials: 'include',
  headers: { 'Content-Language': getLocale() },

  errorHandler: async (error: any) => {
    const { response, data } = error
    const errorMessages: string[] = []
    console.log(error) // eslint-disable-line no-console
    if (response.status === 422) {
      Object.keys(data.errors).forEach((field) => {
        errorMessages.push(...data.errors[field])
      })
    }

    if (response.status === 500) {
      errorMessages.push(data.message)
    }

    if (response.status === 403) {
      history.replace(loginPath)
      return
    }

    if (errorMessages.length > 0) {
      notification.error({
        description: errorMessages.map((message) => <div key={message}>{message}</div>),
        message: intl.formatMessage({ id: 'common.message.request_error' }),
      })
    }

    if (!response) {
      notification.error({
        description: intl.formatMessage({ id: 'common.message.request_network_error' }),
        message: intl.formatMessage({ id: 'common.message.reqeust_network_error.desc' }),
      })
    }
    // throw error
  },
}

export function onRouteChange({ location, matchedRoutes }: { location: any; matchedRoutes: any }) {
  const num = matchedRoutes.length - 1
  if (location.pathname !== matchedRoutes[num].match.url) {
    history.replace(notFoundPath)
  }
}
