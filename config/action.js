import request from '../util/request';
import URL from './url'

export default {
  getActivityList(data) {
    return request.get({
      url: URL.ACTIVITYS_LIST,
      data,
    })
  }
}