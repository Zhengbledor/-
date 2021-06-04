// pages/sz/sz.js
var dairyList = wx.getStorageSync('dairyList')||[]
import { $wuxActionSheet } from '../../miniprogram_npm/wux-weapp/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      dairyList:[],
      _options:{},
      fengmianID:[{
        fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/封面/边框-封面图.png"
      }],
      fengmianURL:""
    },
    addClick:function(){
        wx.navigateTo({
          url: '../../pages/add/add'
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      var dairyList = wx.getStorageSync('dairyList')||[]
      this.setData({
        dairyList:dairyList
      })
      wx.cloud.getTempFileURL({//fenleiURL
        fileList: this.data.fengmianID,
        success: res => {
          
            var tempURL=this.data.fengmianURL
            for(var i=0;i<this.data.fengmianID.length;i++){
                tempURL=res.fileList[i].tempFileURL
            }console.log(123)
            this.setData({ 
                fengmianURL:tempURL
            });
          },
          fail: console.error
    })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      dairyList=wx.getStorageSync('dairyList')||[]
      this.setData({
          dairyList:dairyList
      })
      this.getManhuaURL()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var  dl=wx.getStorageSync('dairyList')||[]
      this.setData({
          dairyList:dl
      })
    },
    intoDairy:function(){
      var id=this.data.dairyList.length
      id=id-1
      wx.navigateTo({
        url: '../../pages/show/show?index='+0
      })
    },
    jumpIn:function(e){
      // var index=e.currentTarget.dataset.index
      // wx.navigateTo({
      //   url: '../../pages/show/show?index='+index
      // })
    const hideSheet=$wuxActionSheet().showSheet({
      theme:'wx',
      buttons:[{
        text:"查看"
      },{
        text:"删除"
      }],
      buttonClicked(index, item) {
        var id=e.currentTarget.dataset.index
        var dairyList = wx.getStorageSync('dairyList')||[]
        if(index==0){
          wx.navigateTo({
           url: '../../pages/show/show?index='+id
         })
          return true
        }
        if(index==1){
          var dl=dairyList
          dl.splice(id,1)
          dairyList=dl
          wx.setStorageSync('dairyList', dairyList)
          wx.navigateTo({
            url: '/pages/test/test',
          })
          return true
        }
        
    },
    })
  },
  getManhuaURL:function(){
    wx.cloud.getTempFileURL({
        fileList: this.data.fengmianID,
        success: res => {
            var tempImaURL=this.data.fengmianURL
            for(var i=0;i<this.data.fengmianID.length;i++){
                tempImaURL.push(res.fileList[i].tempFileURL)
            }
            this.setData({ 
            fengmianURL:tempImaURL});
          },
          fail: console.error
    })
},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      dairyList=wx.getStorageSync('dairyList')||[]
      this.setData({
          dairyList:dairyList
      })
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