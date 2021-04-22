import { get } from '@/utils/request'

export function getUserInfo (data) {
  return get('/api/api/ui/prompt', data)
}
export function setting (data) {
  return get('/api/settings/profile', data)
}
