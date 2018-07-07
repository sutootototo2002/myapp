import axios from 'axios';
//短信验证接口
let base = '';
//验证码
export const verificode = params => { return axios.post(`${base}/admin/verificode`, { params: params }); };
//注册
export const regist = params => { return axios.post(`${base}/admin/regist`, { params: params }); };
//登出
export const loginout = params => { return axios.post(`${base}/admin/loginout`, { params: params }); };
//登录
export const login = params => { return axios.post(`${base}/admin/login`, { params: params }); };
//mail
export const sendmail = params => { return axios.post(`${base}/admin/sendmail`, { params: params }); };
//修改密码
export const modifypwd = params => { return axios.post(`${base}/admin/modifypwd`, { params: params }); };
//管理员列表
export const usermanager = params => { return axios.post(`${base}/admin/usermanager`, { params: params }); };