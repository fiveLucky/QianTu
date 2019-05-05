import Promise from './promise';

const w = {};
const RequestMQ = {
  map: {},
  mq: [],
  running: [],
  MAX_REQUEST: 5,
  push(param) {
    param.t = +new Date();
    while (this.mq.indexOf(param.t) > -1 || this.running.indexOf(param.t) > -1) {
      param.t += (Math.random() * 10) >> 0;
    }
    this.mq.push(param.t);
    this.map[param.t] = param;
  },
  next() {
    const me = this;

    if (this.mq.length === 0) return;

    if (this.running.length < this.MAX_REQUEST - 1) {
      const newone = this.mq.shift();
      const obj = this.map[newone];
      const oldComplete = obj.complete;
      obj.complete = (...args) => {
        me.running.splice(me.running.indexOf(obj.t), 1);
        delete me.map[obj.t];
        oldComplete && oldComplete.apply(obj, args);
        me.next();
      };
      this.running.push(obj.t);
      return wx.request(obj);
    }
  },
  request(obj) {
    obj = obj || {};
    obj =
      typeof obj === 'string'
        ? {
          url: obj
        }
        : obj;

    this.push(obj);

    return this.next();
  }
};
const noPromiseMethods = {
  stopRecord: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  createAnimation: true,
  createContext: true,
  createCanvasContext: true,
  hideKeyboard: true,
  stopPullDownRefresh: true
};

Object.keys(wx).forEach(key => {
  if (!noPromiseMethods[key] && key.substr(0, 2) !== 'on' && !/\w+Sync$/.test(key)) {
    Object.defineProperty(w, key, {
      get() {
        return obj => {
          obj = obj || {};
          if (key === 'request') {
            obj =
              typeof obj === 'string'
                ? {
                  url: obj
                }
                : obj;
          }
          return new Promise((resolve, reject) => {
            const bak = {};
            ['fail', 'success', 'complete'].forEach(k => {
              bak[k] = obj[k];
              obj[k] = res => {
                if (k === 'success') {
                  resolve(res);
                } else if (k === 'fail') {
                  reject(res);
                }
              };
            });
            if (key === 'request') {
              RequestMQ.request(obj);
            } else wx[key](obj);
          });
        };
      }
    });
  } else {
    Object.defineProperty(w, key, {
      get() {
        return (...args) => wx[key].apply(wx, args);
      }
    });
  }
});

export default w;
