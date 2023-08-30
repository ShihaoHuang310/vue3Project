import hyRequest from '@/service'

export const getEntireRoles = () => {
  return hyRequest.post({
    url: '/role/list'
  })
}
export const getEntireDepartments = () => {
  return hyRequest.post({
    url: '/department/list'
  })
}
export const getEntireMenu = () => {
  return hyRequest.post({
    url: '/menu/list'
  })
}
