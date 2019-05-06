
// TODO 剥离 config mock 配置功能
import Promise from './promise';
import w from './w';
import URL from '../config/url';

import {
  STORAGE_KEY,
  MOCK_PROJECT_ID,
  CONTENT_TYPE,
  STATUS_CODE,
  STATUS_MESSAGE
} from '../config/const';

const app = getApp();

Promise.prototype.finally = function (callback) {
  const P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason;
    })
  );
};

// 前13位为时间戳，后1～2位为随机数
function makeRequestId() {
  const timestamp = +new Date();
  const randomNum = Math.floor(Math.random() * 100);
  const id = +`${timestamp}${randomNum}`;
  return id;
}

const onlyOnceMap = {};

/**
 * Request
 * 请求方法 option，参考 wx.request，增加了一下配置项
 *   loading {Boolean} 是否使用 loading，默认为 false
 *   onlyOnce {Boolean} ，默认为 true
 *   toast {Boolean} ，默认为 true
 *
 * Promise 返回标准格式
 * {
 *   status: 0, // 0 成功，非0 失败
 *   message: '描述',
 *   data: any // 数据
 * }
 */

const defaultOption = {
  dataType: 'json',
  loading: false, // 是否显示 loading
  onlyOnce: true, // 一个接口同时只能一个请求
  toast: true, // 错误信息 toast
  retry: false, // TODO 待实现
  trace: false, // TODO 待实现，自动跟踪日志
  timeout: 10000 // TODO 待实现
};
const promise = new Promise(() => { });

const whiteList = [
  URL.LOGIN,
  URL.SEND_VERIFY_CODE
];

function request(option) {
  option = Object.assign({}, defaultOption, option);
  const { url, header, loading, onlyOnce, toast } = option;

  // 本地 mock
  if (app.ENV === 'mock') {
    header.cookie = 'project_id_cookie=' + MOCK_PROJECT_ID;
  }
  header.ws_app_source = 'WX_APP';

  // const userinfo = w.getStorageSync(STORAGE_KEY.USERINFO);
  // if (!userinfo) {
  //   app.login();
  //   return promise;
  // }
  // header.token = userinfo.token;
  // header.deviceid = userinfo.mobilePhone;

  if (onlyOnce) {
    if (onlyOnceMap[url]) {
      return promise;
    }
    onlyOnceMap[url] = true;
  }

  const traceId = makeRequestId();
  option.url = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'traceId=' + traceId;

  if (loading) {
    w.showLoading({
      title: '加载中...',
      mask: true
    });
  }

  function toastHandle(data) {
    if (toast) {
      // TODO 需要异常收集，监控错误
      app.showToast({
        title: data.message
      });
    }
  }


  return new Promise((resolve, reject) => {
    w.request(option).then(res => {
      if (res.statusCode === 200) {
        // 服务器返回结果处理，包含业务成功和失败
        const data = res.data;
        if (typeof data !== 'object') {
          // 数据格式错误，不是有效的 JSON 格式
          const ret = {
            status: STATUS_CODE.PARSE_ERROR,
            message: STATUS_MESSAGE.PARSE_ERROR
          };
          reject(ret);
          toastHandle(ret);
        } else if (data.status === STATUS_CODE.SUCCESS) {
          data.traceId = traceId;
          resolve(data);
        } else if (data.status === STATUS_CODE.WRONT_LOGIN_USER) {
          app.login();
        } else {
          data.message = data.msg || data.message || STATUS_MESSAGE.SERVER_ERROR;
          reject(data);
          toastHandle(data);
        }
      } else if (res.statusCode === STATUS_CODE.UNLOGIN) { // 未授权。未登录
        app.login();
      } else {
        const data = {
          status: STATUS_CODE.TIMEOUT,
          message: STATUS_MESSAGE.TIMEOUT // res.errMsg
        };
        reject(data);
        toastHandle(data);
      }
    }).catch((res) => {
      const data = {
        status: STATUS_CODE.NET_ERROR,
        message: res.message || STATUS_MESSAGE.NET_ERROR, // TODO 需要屏蔽代码错误，显示友好提示
        stack: res.stack
      };
      toastHandle(data);
      reject(data);
    }).finally(() => {
      if (onlyOnce) {
        delete onlyOnceMap[url];
      }
      if (loading) {
        w.hideLoading();
      }
    });
  });
}

export default {
  get(option) {
    option.method = 'GET';
    option.header = option.header || {};
    option.header['content-type'] = CONTENT_TYPE.FORM;
    return request(option);
  },

  post(option) {
    option.method = 'POST';
    option.header = option.header || {};
    option.header['content-type'] = CONTENT_TYPE.JSON;
    return request(option);
  },

  form(option) {
    option.method = 'POST';
    option.header = option.header || {};
    option.header['content-type'] = CONTENT_TYPE.FORM;
    return request(option);
  }
};