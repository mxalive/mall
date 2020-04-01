import axios from 'axios'
export function request(config) {
  const instance =axios.create({
    baseURL:'http://123.207.32.32:8000/api/wh',
    timeout:5000
  })
  instance.interceptors.request.use(req=>{

    return req
  },err=>{
    console.log(err)

  })
  instance.interceptors.response.use(res=>{

    return res.data
  },err=>{
console.log(err)
  })

  return instance(config)
}
// export function request(config) {
//   return new Promise((
//     res, rej) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     instance(config)
//       .then(reso => {
//         res(reso)
//       })
//       .catch(err => {
//         rej(err)
//       })
//   })
// }
// export function request(config) {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//     instance(config)
//       .then(reso => {
//         config.succed(reso)
//       })
//       .catch(err => {
//         config.failure(err)
//       })
// }

