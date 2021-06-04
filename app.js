// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env:"cloud1-7g971elu4fe9349d"
    })
    // 展示本地存储能力
    var dairyList = wx.getStorageSync('dairyList')||[]
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    /*
    dairyList:{
        title:
        test:
        lessTest:
        needLess:
        time:
    }
    */
   dairyList[0]=({
     title:"冯绍峰赵丽颖离婚有感",
     test:"#冯绍峰赵丽颖离婚你怎么看\n\n今天打开微博首推就是“一段路的终点，意味着另一段崭新启程的开始。\n\n人们常说，结婚后人生会进入一个新的阶段，小时候就好奇，那离婚是不是可以让时光倒流，回到结婚前一个阶段，这么想着就觉得以后自己要离了就赚大了。\n\n可是现在有了喜欢的人，才渐渐明白什么叫遇见，什么叫再见。也不知道从什么时候开始，会觉得两个人能够互相喜欢，甚至是互相陪伴都显得那么可贵。\n\n人潮汹涌，我们不过是在对的时间选择陪伴。人潮汹涌，我们不过又会在一个时间走散。\n\n很久之前和一个朋友聊到生命是选择还是注定，我说是选择，他说是注定。我说成事在人，他说成事在天。后来，就是我信了我自己，选择了再见，他相信了我的选择，也没说再见。\n\n一直觉得婚姻是一个很沉重的词，因为我担不起风险也赌不起时光。所以也一直觉得能选择携手步入一个新阶段的人都是被梁静茹祝福的人，都很有勇气，也会分手快乐。\n\n总之，执子之手是各取所需，两厢情愿。放下承诺是各取所需，也将两不相欠。",
     ima:[{fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/日记/7111622822389_.pic_hd.jpg"}],
     time:"2021/4/23 02:48:25"
    })
    dairyList[1]=({
      title:"累死了！😖",
      test:"晚上11点突然收到开题通知\n人裂开😢\n早上四点开始的投资慕课\n我还好\n喝了喜欢的草莓balabala水🤗\n很快乐\n晚上继续做人写调研报告\n加油鸭🦆\n还有几天豆高考了，紧张(bushi)😝",
      ima:[{fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/日记/7081622822280_.pic_hd.jpg"}],
      time:"2021/5/19 23:42:12"
    })
    dairyList[2]=({
      time:"2021/6/3 16:50:32",
      title:"fafa",
      test:"\n呜呜呜真的好喜欢看\n大家甜甜的恋爱\n球球了多发发吧\n\n今天是为好看的花花和有趣的爱情\n落lay的一天😢",
      ima:[{fileID:"cloud://cloud1-7g971elu4fe9349d.636c-cloud1-7g971elu4fe9349d-1305747814/日记/7051622822209_.pic_hd.jpg"}]
    })
    wx.setStorageSync('dairyList', dairyList)
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log("小程序胶囊信息",menuButtonObject)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuButtonObject = menuButtonObject;
        console.log("navHeight",navHeight);
      },
      fail(err) {
        console.log(err);
      }
    })

    
  },
  globalData: {
    userInfo: null
  },
  "enablePullDownRefresh":true
})
