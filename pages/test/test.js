import Toast from '@vant/weapp/toast/toast';// 导入组件vant中的提示功能
const DB = wx.cloud.database().collection("list")// 获取云开发的list集合，数据库
let name = ""//数据库中的列name
let sex = ""//数据库中的性别sex
let url = ""//数据库中图片的路径url

Page({
  data: {
    fileList2: [],//前面文件列表的展示
  },
  onLoad:function (options) {
    wx.navigateBack({
      delta: 1,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
   //-----------------------------------------查询按钮------------------------------------------
  // 查询所有的数据
  getData() {
    var that = this
    DB.get({
      success(res) {
        console.log(res)
        that.setData({
          datas: res.data
        })
      }
    })
  },

     //-----------------------------------------删除按钮------------------------------------------
  //删除数据库中所有的数据
  deleteAll() {
    var that = this
    DB.get({
      success(res) {
        for(var i=0; i < res.data.length; i++) {
          that.deleteOne(res.data[i]._id)
          that.deleteCloudSave(res.data[i].fileID)
        }
      }
    })
  },
   //-----------------------------------------添加按钮------------------------------------------
  // 添加数据
  addData() {
    const { fileList2 = [] } = this.data;
    if(fileList2.length==0 || fileList2[0].status=="uploading") {
      Toast.fail('图片还未上传成功，请等待');
    } else {
      var fileID = this.data.fileID
      Toast.success('图片上传成功');
      DB.add({
        data: {
          name: name,
          sex : sex,
          url: url,
          fileID: fileID
        },
        success(res) {
          console.log("添加成功", res)
        },
        fail() {
          console.log("添加失败", res)
        }
      })
    }
  },


   //-----------------------------------------图片上传的功能------------------------------------------
  // 点击上传图片后的状态
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const { fileList2 = [] } = this.data;
    fileList2.push({})
    fileList2[0].status='uploading'
    this.setData({ fileList2 });
    this.uploadImage(file.url);
  },

  // 上传到云开发的存储中
  uploadImage(fileURL) {
    var that = this
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        //获取图片的http路径，准备添加到数据库中
        that.addImagePath(res.fileID)
        that.setData({
          fileID: res.fileID
        })
      },
      fail: console.error
    })
  },

  // 点击预览的x号，将图片删除
  deleteImg(event) {
    // 页面删除（假删除）
    const delIndex = event.detail.index
    const { fileList2 } = this.data
    fileList2.splice(delIndex, 1)
    this.setData({
      fileList2
    })
    // 云存储删除（真删除）
    var fileID = this.data.fileID;
    this.deleteCloudSave(fileID)

  },
  
   //-----------------------------------------以下为删除按钮前的准备工作--------------------------------
  // 删除数据库中的一个数据
  deleteOne(id) {
    DB.doc(id).remove({
      success(res) {
        Toast.success('图片删除成功');
      },
      fail(res) {
      }
    })
  },

  // 删除云存储的一个文件(此处是图片)
  deleteCloudSave(fileID) {
    wx.cloud.deleteFile({
      fileList: [fileID],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: console.error
    })
  },
  
  //-----------------------------------------一下为添加按钮前的准备工作--------------------------------
  // 获取输入框中的姓名
  addName(event) {
    name = event.detail.value
  },
  // 获取输入框中的性别
  addSex(event) {
    sex = event.detail.value
  },
  // 获取图片上传后的url路径
  addImagePath(fileId) {
    var that = this
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        url = res.fileList[0].tempFileURL
        const { fileList2 = [] } = that.data;
        fileList2[0].url= url
        fileList2[0].status= 'done'
        that.setData({ fileList2 });
      },
      fail: console.error
    })
  },

})