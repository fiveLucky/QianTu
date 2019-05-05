
import w from '../../util/w.js'

Page({
  data: {
    userInfo: {},
  },
  onLoad(options) {

  },
  onShow() {
    w.getSetting().then(response => {
      console.log(response)
    })
  }
})