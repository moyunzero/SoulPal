import axios from 'axios'
import router from "../main";
const request = axios.create({
    baseURL: 'http://localhost/api',
    timeout: 5000,
    withCredentials: true
})

request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

request.interceptors.response.use(
    response => {
        let res = response.data;
        if (res.code === 40100){
            console.log("40100未登录");
            // @ts-ignore
            router.push('/user/login');
        }
        return res;
    },
    error => {
        console.log('err' + error) 
        return Promise.reject(error)
    }
)

export default request