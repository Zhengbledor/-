// pages/fx/fx.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        manhua:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/WechatIMG2.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/WechatIMG3.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/WechatIMG4.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/WechatIMG5.jpeg"
        },
            ],
        manhuaURL:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //先获得manhua的URL
        this.getManhuaURL();
    },
    getManhuaURL:function(){
        wx.cloud.getTempFileURL({
            fileList: this.data.manhua,
            success: res => {
                console.log(11)
                var tempImaURL=this.data.manhuaURL
                for(var i=0;i<this.data.manhua.length;i++){
                    tempImaURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                manhuaURL:tempImaURL});
              },
              fail: console.error
        })
    },
    prev:function(){
        this.setData({
            index:this.data.index-1
        })
    },
    next:function(){
        this.setData({
            index:this.data.index+1
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