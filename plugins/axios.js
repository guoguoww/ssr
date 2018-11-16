// import axios from "axios";

// axios.defaults.timeout = 5000
// axios.defaults.baseURL = process.env.baseURL
import Vue from 'vue'
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log(config)
  })

  $axios.onResponse(response => {//成功回调
    if ((response.data.errorCode && response.data.errorCode !== 0) || (response.errorCode && response.errorCode !== 0 )) { //报错
      Vue.prototype.$Message.error(response.data.errorMsg || response.errorMsg) //弹出信息

      if ((response.data.errorCode || response.errorCode) === -2) { //-2是没有登录状态
        redirect('/login/login')
      }
  }

  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/login')
    }
  })
}
