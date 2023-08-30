import { defineStore } from 'pinia'
import { getAmountListData } from '@/service/main/analysis'

interface IAnalysisState {
  amountList: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      const res = await getAmountListData()
      this.amountList = res.data
    }
  }
})
export default useAnalysisStore
