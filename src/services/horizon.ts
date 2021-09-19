import { request } from 'umi'

export async function stats(options?: Record<string, any>) {
  return request<API.Horizon.StatusResult>('/monitor/api/stats', {
    method: 'GET',
    ...(options || {}),
  })
}
