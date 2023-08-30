const searchConfig = {
  pageName: 'department',
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
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      // placeholder: '请选择创建时间',
      initialValue: ''
    }
  ]
}
export default searchConfig
