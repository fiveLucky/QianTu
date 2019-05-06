const ENV = getApp().ENV;
const urlMap = {
  // 请求活动列表
  // http://game.yulinjue.com/activitys?page=0&count=30&clubid=8a9cd2e46855ae1c01685f5f4379061d&date=2019-05-11&type=all
  ACTIVITYS_LIST: '/activitys'

};

const envMap = {
  mock: 'https://easy-mock.com/mock/5ccffb583a980e698b50420a/example',
  prod: 'https://game.yulinjue.com',
};

const _urlMap = () => {
  const obj = {};
  for (const key in urlMap) {
    obj[`${key}`] = `${envMap[ENV]}${urlMap[key]}`;
  }
  return obj;
};

export default _urlMap();

