import hyRequest from '@/service'

export const getAmountListData = () => {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}
