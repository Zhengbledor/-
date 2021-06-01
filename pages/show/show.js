// pages/show/show.js
var util=require("../../utils/util.js")
var dairyList = wx.getStorageSync('dairyList')||[]
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:-1,
        title:"",
        test:"",
        tempTitle:"",
        tempTest:"",
        ifEdi:false,
        edi:"编辑",
        lessTest:"",
        ima:[],
        needLess:false
    },
    ediClick:function(e){
        if(this.data.ifEdi==false)
            this.setData({
                ifEdi:true,
                edi:"取消编辑"
            })
        else
            this.setData({
                ifEdi:false,
                edi:"编辑"
            })
    },
    delClick:function(e){
        var dl=dairyList
        dl.splice(this.data.index,1)
        dairyList=dl
        wx.setStorageSync('dairyList', dairyList)
        wx.navigateBack({
          delta: 1
        })
    },
    titleChange:function(e){
        this.setData({
            tempTitle:e.detail.value
        })
    },
    testChange:function(e){
        this.setData({
            tempTest:e.detail.value
        })
    },
    saveClick:function(e){
        if(this.data.tempTitle==""){
             $wuxToast().show({
                type:'forbidden',
                duration:1500,
                color:'#ffff',
                text:"请输入标题",
                success:()=>console.log("禁止操作")
            })
            return 
        }
           
        else if(this.data.tempTest==""){
                $wuxToast().show({
                type:'forbidden',
                duration:1500,
                color:'#ffff',
                text:"请输入内容",
                success:()=>console.log("禁止操作")
            })
            return
        }
        
        if(this.data.tempTest.length>50)
        {
            var temp=this.data.tempTest.substring(0,50)
            this.setData({
                needLess:true,
                lessTest:temp
            })
        }

        var dairyList = wx.getStorageSync('dairyList')||[]
        var index=this.data.index
        dairyList[index].title=this.data.tempTitle
        dairyList[index].test=this.data.tempTest
        dairyList[index].time=util.formatTime(new Date())
        dairyList[index].needLess=this.data.needLess
        dairyList[index].lessTest=this.data.lessTest
        
        wx.setStorageSync('dairyList',dairyList)
        wx.navigateBack({
          delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var dairyList = wx.getStorageSync('dairyList')||[]
        var id=options.index
        this.setData({
            index:id,
            title:dairyList[id].title,
            test:dairyList[id].test,
            tempTitle:dairyList[id].title,
            tempTest:dairyList[id].test
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
        //console.log("测试")
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