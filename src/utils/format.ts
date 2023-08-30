import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const formatUTC = (utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  const res = dayjs.utc(utcString).utcOffset(8).format(format)
  return res
}
