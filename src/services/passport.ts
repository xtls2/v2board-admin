import { request } from 'umi'
import { apiContentType } from '@/default'

export async function login(body: API.Passport.LoginParams, options?: Record<string, any>) {
  return request<API.Passport.LoginResult>('/api/v1/passport/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': apiContentType,
    },
    data: body,
    ...(options || {}),
  })
}

export async function checkAuth(options?: Record<string, any>) {
  return request<API.Passport.CheckAuthResult>('/api/v1/passport/auth/check', {
    method: 'GET',
    ...(options || {}),
  })
}
