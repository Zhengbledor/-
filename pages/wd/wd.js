

// TODO 订单显示数量在图标上

import { $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        status: {},
    },
    
    onLoad: function(options) {
    },
    onShow: function() {
        let userInfo = wx.getStorageSync('userInfo');
        if(userInfo == ''){
            this.setData({
                hasUserInfo: 0,
            });
        }
        else{
            this.setData({
                hasUserInfo: 1,
            });
        }
        this.setData({
            userInfo: userInfo,
        });

        wx.removeStorageSync('categoryId');
    },

    go:function(){
        $wuxToast().show({
            type:'forbidden',
            duration:1500,
            color:'#ffff',
            text:"暂未开放",
            success:()=>console.log("禁止操作")
        })
    }
    
})