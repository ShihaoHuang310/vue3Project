const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    {
      type: 'selection',
      label: '选择',
      width: '80'
    },
    {
      type: 'index',
      label: '序号',
      width: '80',
      align: 'center'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      align: 'center'
    },
    {
      type: 'normal',
      prop: 'intro',
      label: '权限名称',
      align: 'center'
    },

    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间',
      align: 'center'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间',
      align: 'center'
    },
    {
      type: 'handler',
      label: '操作',
      width: '150',
      fixed: 'right'
    }
  ]
}
export default contentConfig
