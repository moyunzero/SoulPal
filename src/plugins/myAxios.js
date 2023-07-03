import axios from "axios";

// 创建实例时配置默认值
const myAxios = axios.create({
  baseURL: 'https://api.example.com'
});

myAxios.defaults.withCredentials = true; // 允许携带 cookie
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  console.log("我要发送请求了,",config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("我收到你的响应了,",response)
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default myAxios;