// pages/goodDetail/goodDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        faved:false,
        jjqdID:[{fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/敬请期待.png"}],
        jjqdURL:""
    },
    readConfigVal() {
        let tabs = [{
          tabs_name: '商品简介',
          view_id: 'swiper-container',
          topHeight: 0
        }, {
          tabs_name: '商品详情',
          view_id: 'goods-des-info',
          topHeight: 0,
        }, {
          tabs_name: '商品评价',
          view_id: 'reputation',
          topHeight: 0,
        }]
        this.setData({
            tabs
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.readConfigVal();
        wx.cloud.getTempFileURL({
            fileList: this.data.jjqdID,
            success: res => {
              var url = res.fileList[0].tempFileURL
              var fileList2=this.data.jjqdURL
              fileList2 = url
              console.log(url)
              this.setData({ jjqdURL :fileList2});
            },
            fail: console.error
          })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})