
import w from '../../util/w.js'
import action from '../../config/action'
import ment from '../../util/ment.js'

Page({
  data: {
    dateList: new Array(6).fill(1).map((n, i) => ment.addDate(i)),
    activityList: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

  },
  onLoad(options) {

  },
  onShow() {
    const curPage = getCurrentPages();
    console.log(curPage)
    // 请求活动list
    action.getActivityList().then(res => {
      this.setData({
        activityList: res.data
      })
    })
  }
})