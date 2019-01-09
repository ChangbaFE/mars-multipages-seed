import axios from 'axios';
import qs from 'qs';

// axios.defaults.baseURL = 'https://mars.changba.com'
// axios.defaults.baseURL = 'http://liguanqun.marswww.ktv314.vps.changbaops.com/'

// 设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}

// 请求超时时间
axios.defaults.timeout = 10000;

// http request 拦截器
axios.interceptors.request.use( config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use( response => {
  // 请求成功
  if (response.status === 200 || response.status === 304) {
    return Promise.resolve(response); 
  }
  else {
    return Promise.reject(response);
  }
}, error => {
  const { response } = error;

  if (response) {
     // 请求已发出，但是不在2xx的范围 
     errorHandler(response.status, response.data.message);
     return Promise.reject(response);
  }
  else {
    // 处理断网的情况
    console.log('断网啦')
  }
})

/**
 *  处理异常
 *
 * @param {*} status
 * @param {*} errMsg
 */
function errorHandler(status, errMsg) {
  switch (status) {
    // 未登录
    case 401:
      console.log('未登录');
      alert('未登录');
      break;
    case 403:
      console.log('登录过期');
      alert('登录过期');
      break;
    case 404:
      console.log('请求资源不存在');
      alert('请求资源不存在');
    default:
      console.log(errMsg);
      break;
  }
}

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(res => {
        resolve(res.data);
       }
      ).catch(err => {
        reject(err.data);
      })
    })
  },
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params, // get 请求时带的参数
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(res => {
         resolve(res.data);
        }
      ).catch(err => {
        reject(err.data);
      })
    })
    
  }
}