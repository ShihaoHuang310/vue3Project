export const BASE_URL = 'http://codercba.com:5000'
export const TIME_OUT = 10000
// console.log(import.meta.env.MODE)
// 区分开发环境和生产环境
// 1.手动
// let envrioment = ''
// const BASE_URL = 'production'

/*
  2.根据环境变量判断切换
  BASE_URL DEV MODE PROD SSR
*/

if (import.meta.env.MODE === 'development') {
  // envrioment = 'development'
} else {
  // envrioment = 'production'
}

// 3.根据dotenv文件 .env .env.[mode] VITE_

// console.log(import.meta.env)
// console.log('envrioment:', envrioment)
