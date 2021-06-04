// pages/add/add.js
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
        title:"",
        test:"",
        lessTest:"",
        ima:[],
        fileList2:[],
        needLess:false
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
        if(this.data.title==""){
             $wuxToast().show({
                type:'forbidden',
                duration:1500,
                color:'#ffff',
                text:"请输入标题",
                success:()=>console.log("禁止操作")
            })
            return 
        }
           
        else if(this.data.test==""){
             $wuxToast().show({
            type:'forbidden',
            duration:1500,
            color:'#ffff',
            text:"请输入内容",
            success:()=>console.log("禁止操作")
            })
            return
        }
        const fileList2=this.data.fileList2
        for(var i=0;i<fileList2.length;i++){
            if(fileList2[i].status=="uploading")
            {
                $wuxToast().show({
                    type:'forbidden',
                    duration:1500,
                    color:'#ffff',
                    text:"正在上传图片",
                    success:()=>console.log("禁止操作")
                    })
                return ;
            }
        }

        if(this.data.test.length>50)
        {
            var tempTest=this.data.test.substring(0,50)
            this.setData({
                needLess:true,
                lessTest:tempTest
            })
        }
        var dairyList = wx.getStorageSync('dairyList')||[]
        dairyList.push({
            title:this.data.title,
            test:this.data.test,
            time:util.formatTime(new Date()),
            needLess:this.data.needLess,
            lessTest:this.data.lessTest,
            ima:this.data.ima
        })
        wx.setStorageSync('dairyList',dairyList)
        wx.navigateBack()
    },
    afterRead(event) {
        const upIndex=event.detail.index
        const file  = event.detail.file;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        const fileList2 = this.data.fileList2;
        fileList2.push({
            status:"uploading",
            url:file.url
        })
        this.setData({ fileList2 });
        this.uploadImag(file.url,upIndex);
    },
    //点击X号
    deleteImg(event) {
        // 页面删除（假删除）
        const delIndex = event.detail.index
        const { fileList2 } = this.data
        fileList2.splice(delIndex, 1)
        var img=this.data.ima
        img.splice(delIndex,1)
        this.setData({
          fileList2:fileList2,
          ima:img
        })
        // 云存储删除（真删除）
        var fileID = ""+this.data.ima[delIndex];
        this.deleteCloudSave(fileID)
    
      },
      deleteCloudSave(fileID) {
        console.log(fileID)
        wx.cloud.deleteFile({
        fileList: [fileID],
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: console.error
        })
      },
      //上传到云开发存储中
    uploadImag(fileURL,upIndex){
        var that = this
        wx.cloud.uploadFile({
            cloudPath:new Date().getTime()+'.png',//路径
            filePath:fileURL,
            success:res=>{
                that.addImagePath(res.fileID,upIndex)//获得上传成功后的url路径
                var img=that.data.ima;
                img.push({//保存fileID
                    fileID:res.fileID
                })
                this.setData({
                    ima:img
                })
            },
            fail: console.error
        })
    },
    addImagePath(fileId,upIndex) {
        var that = this
        wx.cloud.getTempFileURL({
          fileList: [fileId],
          success: res => {
            var url = res.fileList[0].tempFileURL
            var fileList2=that.data.fileList2
            fileList2[upIndex].url= url
            fileList2[upIndex].status= 'done'
            that.setData({ fileList2 :fileList2});
          },
          fail: console.error
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var dairyList = wx.getStorageSync('dairyList')||[]
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