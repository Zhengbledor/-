import Toast from '@vant/weapp/toast/toast';
var util=require("../../utils/util.js")
import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const DB = wx.cloud.database().collection("imaList")
var dairyList = wx.getStorageSync('dairyList')||[]
/*
    dairyList:{
        title:
        test:
        lessTest:
        needLess:
        time:
    }
*/
Page({
    /**
     * 页面的初始数据
     */
    data: {
        index:-1,
        title:"",
        test:"",
        lessTest:"",
        ima:[],
        needLess:false,
        abs:"12345"
    },
    saveClick:function(e){
        console.log(e);
    },
    titleChange:function(e){
        this.setData({
            title:e.detail.value
        })
    },
    testChange:function(e){
        this.setData({
            test:e.detail.value
        })
    },
    onSuccess:function(e){
        console.log(e);
    },
    saveClick:function(e){
        console.log(this.data.test)
        if(this.data.title=="")
            $wuxToast().show({
                type:'forbidden',
                duration:1500,
                color:'#ffff',
                text:"请输入标题",
                success:()=>console.log("禁止操作")
            })
        else if(this.data.test=="")
        $wuxToast().show({
            type:'forbidden',
            duration:1500,
            color:'#ffff',
            text:"请输入内容",
            success:()=>console.log("禁止操作")
        })
        if(this.data.test.length>50)
        {
            var tempTest=this.data.test.substring(0,50)
            this.setData({
                needLess:true,
                lessTest:tempTest
            })
        }

        var index=this.data.index
        dairyList[index].title=this.data.title
        dairyList[index].test=this.data.test
        dairyList[index].time=util.formatTime(new Date())
        dairyList[index].needLess=this.data.needLess
        dairyList[index].lessTest=this.data.lessTest
        
        wx.setStorageSync('dairyList',dairyList)
        wx.navigateBack({
          delta: 2,
        })
    },
    afterRead(event) {
        const file  = event.detail.file;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        const ima = this.data.ima;
        fileList2.push({})
        fileList2[0].status='uploading'
        this.setData({ fileList2 });
        this.uploadImage(file.url);
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var dairyList = wx.getStorageSync('dairyList')||[]
        var that=this
        var index=options.index
        this.setData({
            index:index,
            title:dairyList[index].title,
            test:dairyList[index].test,
            needLess:dairyList[index].needLess,
            abs:this.data.title
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