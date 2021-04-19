import { get } from '@/utils/request'

export function getUserInfo (data) {
  return get('/api/api/ui/prompt', data)
}
