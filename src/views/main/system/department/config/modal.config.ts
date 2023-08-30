import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'department',
  header: {
    addTitle: '新增部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入部门领导',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '',
      initialValue: '',
      options: []
    }
  ]
}
export default modalConfig
