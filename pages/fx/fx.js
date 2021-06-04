// pages/fx/fx.js
var util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        manhua:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/331622821776_.pic.jpg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/321622821743_.pic_hd.jpg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/311622821710_.pic_hd.jpg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/漫画/301622821698_.pic_hd.jpg"
        },
            ],
        manhuaURL:[],
        feed:[],
        feed_length:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //先获得manhua的URL
        this.getManhuaURL();
        var feed=util.getData()
        console.log(feed)
        var feed_data=feed.data
        this.setData({
            feed:feed_data,
            feed_length:feed_data.length
        })

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