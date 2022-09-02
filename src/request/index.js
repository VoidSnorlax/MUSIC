import axios from 'axios';
let service=axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 3000,
})//封装axios实例
export default service