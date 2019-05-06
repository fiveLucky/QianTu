App({
  ENV: 'mock',
  onLaunch: () => {
    wx.showToast({
      title: 'have fun',
      image: './images/fun.png'
    })
  }
})