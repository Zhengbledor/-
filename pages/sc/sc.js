// pages/sc/sc.js
const APP=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fenlei:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/dongshi.jpeg"   
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/zhushi.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/maosha.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/maotiao.jpeg"
        }],
        fenleiURL:[],
        dongshi:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/冻食/WechatIMG10.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/冻食/WechatIMG11.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/冻食/WechatIMG12.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/冻食/WechatIMG13.jpeg"
        }],
        dongshiURL:[],
        zhushi:[{
            fileID:"	cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/主食/WechatIMG14.jpeg",
        },{
            fileID:"	cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/主食/WechatIMG15.jpeg",
        },{
            fileID:"	cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/主食/WechatIMG16.jpeg",
        },{
            fileID:"	cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/主食/WechatIMG17.jpeg",
        }],
        zhushiURL:[],
        maosha:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫砂/WechatIMG18.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫砂/WechatIMG19.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫砂/WechatIMG20.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫砂/WechatIMG23.jpeg"
        }],
        maoshaURL:[],
        maotiao:[{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG24.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG25.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG26.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG27.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG28.jpeg"
        },{
            fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/分类/猫条/WechatIMG29.jpeg"
        }],
        maotiaoURL:[]
    },
    goSearch:function(){
        wx.navigateTo({
            url: '/pages/search/search'
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getImaURL()
    },
    getImaURL:function(){
        wx.cloud.getTempFileURL({//fenleiURL
            fileList: this.data.fenlei,
            success: res => {
                var tempURL=this.data.fenleiURL
                for(var i=0;i<this.data.fenlei.length;i++){
                    tempURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                    fenleiURL:tempURL
                });
              },
              fail: console.error
        })
        wx.cloud.getTempFileURL({//dongshiURL
            fileList: this.data.dongshi,
            success: res => {
                var tempURL=this.data.dongshiURL
                for(var i=0;i<this.data.dongshi.length;i++){
                    tempURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                    dongshiURL:tempURL
                });
              },
              fail: console.error
        })
        wx.cloud.getTempFileURL({//zhushiURL
            fileList: this.data.zhushi,
            success: res => {
                var tempURL=this.data.zhushiURL
                for(var i=0;i<this.data.zhushi.length;i++){
                    tempURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                    zhushiURL:tempURL
                });
              },
              fail: console.error
        })
        wx.cloud.getTempFileURL({//maoshaURL
            fileList: this.data.maosha,
            success: res => {
                var tempURL=this.data.maoshaURL
                for(var i=0;i<this.data.maosha.length;i++){
                    tempURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                    maoshaURL:tempURL
                });
              },
              fail: console.error
        })
        wx.cloud.getTempFileURL({//maotiaoURL
            fileList: this.data.maotiao,
            success: res => {
                var tempURL=this.data.maotiaoURL
                for(var i=0;i<this.data.maotiao.length;i++){
                    tempURL.push(res.fileList[i].tempFileURL)
                }
                this.setData({ 
                    maotiaoURL:tempURL
                });
              },
              fail: console.error
        })
    },
    detail:function(){
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail',
      })  
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("App.globalData.navHeight", APP.globalData.navHeight)
        console.log("App.globalData.navTop", APP.globalData.navTop)
        console.log("App.globalData.windowHeight", APP.globalData.windowHeight)
        this.setData({
        navHeight: APP.globalData.navHeight,
        navTop: APP.globalData.navTop,
        windowHeight: APP.globalData.windowHeight,
        menuButtonObject: APP.globalData.menuButtonObject //小程序胶囊信息
    })
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