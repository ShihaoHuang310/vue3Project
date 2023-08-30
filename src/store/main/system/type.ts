export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
export interface ISystemState {
  userList: IUser[]
  userTotalCount: number
  pageList: any[]
  pageTotalCount: number
}
