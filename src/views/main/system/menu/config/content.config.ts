const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    {
      prop: 'name',
      label: '菜单名称',
      align: 'center'
    },
    {
      prop: 'type',
      label: '级别',
      align: 'center'
    },
    {
      prop: 'url',
      label: '菜单URL',
      align: 'center'
    },
    {
      prop: 'icon',
      label: '菜单Icon',
      align: 'center'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center'
    },
    {
      prop: 'permissions',
      label: '权限',
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
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
export default contentConfig
