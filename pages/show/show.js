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
        tempima:[],//暂存的图片ID
        tempImaURL:[],//暂存的图片地址，用来在编辑的时候显示
        imaURL:[],
        needLess:false
    },
    ediClick:function(e){
        if(this.data.ifEdi==false){
            this.setData({
                ifEdi:true,
                edi:"取消编辑"
            })
        }
            
        else{
            var tempima=Object.create(this.data.ima)
            var tempImaURL=Object.create(this.data.imaURL)
            this.setData({
                tempima:tempima,//回到初始位置
                tempImaURL:tempImaURL,
                ifEdi:false,
                edi:"编辑"
            })
        }
            
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
        const tempImaURL=this.data.tempImaURL
        for(var i=0;i<tempImaURL.length;i++){
            if(tempImaURL[i].status=="uploading")
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
        dairyList[index].ima=this.data.tempima
        wx.setStorageSync('dairyList',dairyList)
        wx.navigateBack({
          delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var dairyList = wx.getStorageSync('dairyList')||[]
        var id=options.index
        this.setData({
            index:id,
            title:dairyList[id].title,
            test:dairyList[id].test,
            tempTitle:dairyList[id].title,
            tempTest:dairyList[id].test,
            ima:dairyList[id].ima
        })
        var tempima=this.data.tempima
        for(var i=0;i<this.data.ima.length;i++){
            tempima.push({
                fileID:this.data.ima[i].fileID
            })
        }
        this.setData({
            tempima:tempima
        })
        this.getImaURL();
    },
    getImaURL:function(){
        if(this.data.ima.length==undefined)
            return
        wx.cloud.getTempFileURL({
            fileList: this.data.ima,
            success: res => {
                var tempURL=this.data.imaURL;
                var tempImaURL=this.data.tempImaURL
                for(var i=0;i<this.data.ima.length;i++){
                    tempURL.push({})
                    tempURL[i].url=res.fileList[i].tempFileURL
                    tempURL[i].status="done"
                    tempImaURL.push({})
                    tempImaURL[i].url=res.fileList[i].tempFileURL
                    tempImaURL[i].status="done"
                }
                this.setData({ imaURL :tempURL,
                tempImaURL:tempImaURL});
                console.log(this.data.tempima)
                console.log(this.data.ima)
              },
              fail: console.error
        })
    },
    afterRead(event) {
        const upIndex=event.detail.index
        const file  = event.detail.file;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        const tempImaURL = this.data.tempImaURL;
        tempImaURL.push({
            status:"uploading",
            url:file.url
        })
        this.setData({ tempImaURL });
        this.uploadImag(file.url,upIndex);
    },
    //点击X号
    deleteImg(event) {
        // 页面删除（假删除）
        console.log(event)
        const delIndex = event.detail.index
        var tempImaURL = this.data.tempImaURL
        tempImaURL.splice(delIndex, 1)
        var tempimg=this.data.tempima
        tempimg.splice(delIndex,1)
        this.setData({
          tempImaURL:tempImaURL,
          tempima:tempimg
        })
        // 云存储删除（真删除）  编辑不删除云
        // var fileID = ""+this.data.tempima[delIndex];
        // this.deleteCloudSave(fileID)
    
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
            cloudPath:""+new Date().getTime()+'.png',//路径
            filePath:fileURL, 
            
            success:res=>{
                console.log(this.data.tempima)
                console.log(res)
                var tempimg=that.data.tempima;
                tempimg.push({//保存fileID
                    fileID:res.fileID
                })
                console.log(this.data.tempima)
                this.setData({
                    tempima:tempimg
                })
                console.log(this.data.tempima)
                that.addImagePath(res.fileID,upIndex)//获得上传成功后的url路径
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
            var imaURL=that.data.tempImaURL
            imaURL[upIndex].url= url
            imaURL[upIndex].status= 'done'
            that.setData({ tempImaURL :imaURL});
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