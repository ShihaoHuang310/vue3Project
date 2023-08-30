import hyRequest from '@/service'

export const postUsersListData = (queryInfo: any) => {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export const deleteUsersById = (id: number) => {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
export const addUserData = (userInfo: any) => {
  return hyRequest.post({
    url: `/users`,
    data: userInfo
  })
}

export const updateUserById = (id: number, userInfo: any) => {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
//-------------------------复用接口
export const postPageListData = (pageName: string, queryInfo: any) => {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export const deletePageById = (pageName: string, id: number) => {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export const addPageData = (pageName: string, pageInfo: any) => {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export const updatePageById = (pageName: string, id: number, pageInfo: any) => {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
