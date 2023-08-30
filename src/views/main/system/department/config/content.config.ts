const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
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
      label: '部门名称',
      align: 'center'
    },
    {
      type: 'normal',
      prop: 'leader',
      label: '部门领导',
      align: 'center'
    },
    {
      type: 'normal',
      prop: 'parentId',
      label: '上级部门',
      align: 'center'
    },
    {
      type: 'custom',
      prop: 'leader',
      label: '部门领导',
      align: 'center',
      slotName: 'leader'
    },
    {
      type: 'custom',
      prop: 'parentId',
      label: '上级部门',
      align: 'center',
      slotName: 'parent'
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
