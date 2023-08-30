import useLoginStore from '@/store/login/login'

const usePermissions = (permissionsId: string) => {
  //获取权限
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return !!permissions.find((item) => item.includes(permissionsId))
}
export default usePermissions
