import axios from "axios";
const HttpServer = {};
HttpServer.install = function(Vue) {
  // 4. 添加实例方法

  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

  axios.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
    //   config.url不是完成的请求地址，不包括baseUrl部分地址
      if (!config.url === 'login') {
        const Askheader = localStorage.getItem('token')
        this.axios.defaults.headers.common['Authorization'] = Askheader
      }
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  Vue.prototype.axios = axios
}
export default HttpServer;
