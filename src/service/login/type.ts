interface ILoginData {
  id: number
  name: string
  token: string
}
export interface ILogin {
  code: number
  data: ILoginData
}
export interface IUserInfoData {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
  }
  department: {
    id: number
    name: string
    parentId: any
    createAt: string
    updateAt: string
    leader: string
  }
}

export interface IUserInfo {
  code: number
  data: IUserInfoData
}

export type IMenuInfoData = Array<{
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Array<{
    id: number
    url: string
    name: string
    sort: number
    type: number
    children?: Array<{
      id: number
      url: any
      name: string
      sort: any
      type: number
      parentId: number
      permission: string
    }>
    parentId: number
  }>
}>

export interface IMenuInfo {
  code: number
  data: IMenuInfoData
}
