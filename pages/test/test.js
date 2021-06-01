
Page({
  data: {
  },
  onLoad:function (options) {
    wx.navigateBack({
      delta: 1,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})