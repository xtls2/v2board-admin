import { request } from 'umi'
// import { apiContentType } from '@/default'

export async function userInfo(options?: Record<string, any>) {
  return request<API.User.InfoResult>('/api/v1/user/info', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function logout(options?: Record<string, any>) {
  return request<API.User.LogoutResult>('/api/v1/user/logout', {
    method: 'GET',
    ...(options || {}),
  })
}
