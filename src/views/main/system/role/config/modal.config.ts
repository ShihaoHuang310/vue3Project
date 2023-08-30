import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    addTitle: '新增角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'intro',
      label: '角色权限',
      placeholder: '请输入角色权限',
      initialValue: ''
    },
    {
      type: 'custom',
      // prop: '分配权限',
      label: '角色权限',
      slotName: 'menuList'
    }
  ]
}
export default modalConfig
