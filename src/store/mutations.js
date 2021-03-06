import {

  LOGIN_ACCOUNT,
  ADDUSERANSWERDATA,
  USERLOCALLOGIN,
  USERCANCELLOGIN
} from './mutation-types.js'

import {
    CookieUtil
} from '../utils/common'



export default {

  /**
   * 用户的回答   todo  del
   * @param state
   * @param arr
   */
  [ADDUSERANSWERDATA](state, arr){
    state.userSendAnswerData[arr.uri] = arr;
  },


  [USERLOCALLOGIN](state, userInfo, token){
    if(userInfo){
      state.isLogin = true;
      state.userInfo = userInfo;
      state.token = token;
    }
  },

  /**
   * 用户登录
   * @param state
   * @param userData
   */
  [LOGIN_ACCOUNT](state, userData) {
    "use strict";
    if (userData.token) {
      state.isLogin = true;
      state.token = userData.token;
      state.userInfo = userData;
      var expires = new Date(new Date().getTime() + 86400 * 1000 * 7);
      CookieUtil.set('TOKEN', userData.token, expires, '/');
    }else{
      state.userInfo = userData;
    }
  },

  /**
   * 注销登录
   * @param state
   */
  [USERCANCELLOGIN](state){
    state.isLogin = false;
    state.token = '';
    state.userInfo = [];
    CookieUtil.unset('TOKEN');
  }



}
