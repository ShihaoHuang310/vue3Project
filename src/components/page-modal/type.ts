export interface IModalConfig {
  pageName?: string
  header: {
    addTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IProps {
  modalConfig: IModalConfig
  otherInfo?: any
}
