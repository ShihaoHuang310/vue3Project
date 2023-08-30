const searchConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'role',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'role',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      initialValue: ''
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      // placeholder: '请选择创建时间',
      initialValue: ''
    }
    // {
    //   type: 'select',
    //   prop: 'enable',
    //   label: '状态',
    //   placeholder: '请选择状态',
    //   initialValue: '',
    //   options: [
    //     { label: '启用', value: '1' },
    //     { label: '禁用', value: '0' }
    //   ]
    // }
  ]
}
export default searchConfig
