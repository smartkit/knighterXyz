//Index.js
//获取应用实例
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import { ENDPOINT_IMAGE_UPLOAD } from '../../constants/api-endpoints'

//
require('../../components/weapp-adapter.js'); //官方adapter
window.createjs = require('../../components/createLib/create.js')
window.rootStage = new createjs.Stage(canvas) //canvas为主域主屏canvas
window.createjs.Ticker.framerate = 60
window.createjs.Ticker.addEventListener("tick", tick)
function tick(e) {
  rootStage.update()
}
var app = getApp();
Page({
created (options) {
    console.log(options,option.query)
    // Do some initialize when page load.
  },
onReady () {
// console.log(this.selectComponent())
// Do something when page ready.
// console.log("result router:",this);
//global variables
	setGlobalData("withImages",[]);
	setGlobalData("uploadedImages",[]);
	setGlobalData("imagePreview",{});
  
},
onLoad: function(option){
      console.log("@IndexPage,onLoad:",option)
}
,saveToAspectRatio(aspect,resizedWidth,resizedHeight,scaledX,scaledY ){
   //
    var windowHeight = getGlobalData("windowHeight");
    var windowWidth = getGlobalData("windowWidth");
    //
    var aspectRatioObj = {aspect:aspect};//to be calculated.
    console.log("resizedWidth:",resizedWidth,",resizedHeight:",resizedHeight,",scaledX:",scaledX,",scaledY:",scaledY);
    //save calculated results.
    aspectRatioObj.resizedHeight = resizedHeight;
    aspectRatioObj.resizedWidth = resizedWidth;
    //
    aspectRatioObj.scaleX = scaledX;
    aspectRatioObj.scaleY = scaledY;
    //
    var imagePreviewObj = getGlobalData('imagePreview');
    aspectRatioObj.rawImgWidth = imagePreviewObj.width;
    aspectRatioObj.rawImgHeight = imagePreviewObj.height;
    //raw raspect ratio
    var ratio = aspectRatioObj.rawImgWidth/aspectRatioObj.rawImgHeight;
    aspectRatioObj.ratio = ratio;
    aspectRatioObj.byHeight = aspectRatioObj.rawImgWidth<aspectRatioObj.rawImgHeight;
    //
    aspectRatioObj.windowHeight = windowHeight;
    aspectRatioObj.windowWidth = windowWidth;
    //
    setGlobalData("aspectRatio",aspectRatioObj);
    console.log("saved global aspectRatio:",getGlobalData("aspectRatio"));
    // go to result page.
    wx.navigateTo({
      url: '/pages/results/result'
      // url: '/pages/preview/preview'
    })
}
,calculateAspectRatioByRaw2Device(imagePreviewObj){
    //
    var windowHeight = getGlobalData("windowHeight");
    var windowWidth = getGlobalData("windowWidth");
    //
    var rawImgWidth = imagePreviewObj.width;
    var rawImgHeight = imagePreviewObj.height;
    //
    var aspectRatioRaw = ( rawImgWidth / rawImgHeight );
    //
    var aspectRatioByH = ( windowHeight / rawImgHeight );
    var aspectRatioByW = ( windowWidth / rawImgWidth );

    var aspectRatio = aspectRatioByH>aspectRatioByW?aspectRatioByW : aspectRatioByH;
    console.log("aspectRatioByH:",aspectRatioByH,",aspectRatioByW:",aspectRatioByW,",aspectRatio:",aspectRatio);
    //
    var resizedHeight = 0;
    var resizedWidth = 0;
    var scaleX = 1;
    var scaleY = 1;
    //
    var byHeight = aspectRatioByW>aspectRatioByH;
    if(byHeight)
    {
      resizedHeight = rawImgHeight>windowHeight?windowHeight:windowHeight;//with scale
      resizedWidth = resizedHeight *aspectRatioRaw;
    }else{//by width
      resizedWidth = rawImgWidth>windowWidth?windowWidth:windowWidth;//with scale
      resizedHeight = resizedWidth / aspectRatioRaw;
    }
    scaleX = resizedWidth / rawImgWidth;
    scaleY = resizedHeight / rawImgHeight;
   //
   this.saveToAspectRatio("byRaw2Device",resizedWidth,resizedHeight,scaleX,scaleY);
}
,calculateAspectRatioByRawImage(imagePreviewObj){
  //
    var windowHeight = getGlobalData("windowHeight");
    var windowWidth = getGlobalData("windowWidth");
    //
    var rawImgWidth = imagePreviewObj.width;
    var rawImgHeight = imagePreviewObj.height;
    var aspectRatio = ( rawImgWidth / rawImgHeight );
    //
    var resizedHeight = 0;
    var resizedWidth = 0;
    var scaleX = 1;
    var scaleY = 1;
    //
    var byHeight = rawImgWidth<rawImgHeight;
    if(byHeight)
    {
      resizedHeight = rawImgHeight>windowHeight?windowHeight:rawImgHeight;
      resizedWidth = resizedHeight * aspectRatio;
    }else{//by width
      resizedWidth = rawImgWidth>windowWidth?windowWidth:rawImgWidth;
      resizedHeight = resizedWidth / aspectRatio;
    }
    scaleX = resizedWidth / rawImgWidth;
    scaleY = resizedHeight / rawImgHeight;
   //
   this.saveToAspectRatio("byRawImage",resizedWidth,resizedHeight,scaleX,scaleY);
    
  }
,onInstructionBtnClick: function(e){
  // 跳转到目的页面，打开新页面
  wx.navigateTo({
    // url: '/pages/results/result?image='+this.state.withResults
    url: '/pages/instruction/instruction'
  })
}
,onImagePickerBtnClick: function(e){
	var _this = this;
	wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("onImagePickerBtnClick res:",res,",tempFiles:",res.tempFiles);
        //update the values of withImages
      	setGlobalData("withImages",tempFilePaths);
      	//
      	_this.imageUploadHandler();
      },
      fail:function(error){
      	console.error(error);
      }
    })
 }   
,imageUploadHandler: function(){
	var _this = this;
    console.log("ENDPOINT_IMAGE_UPLOAD:",ENDPOINT_IMAGE_UPLOAD);
    //
    let filePath = getGlobalData("withImages")[0];
    console.log("getGlobalData(withImages):",getGlobalData("withImages"),"[0]:",filePath);
    // File that needs to be uploaded.
    // https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html#wxuploadfileobject
    let uploadParam = {
      url: ENDPOINT_IMAGE_UPLOAD,
      // url: "http://101.201.152.97:5001/pics/pics-automatic-review",
      filePath: filePath,
      name: "file",
      header:{
        'content-type': 'application/json' // 默认值
      }
    }
    // const uploadTask = wx.uploadFile(uploadParam).then(
    //   wx.showLoading({title: '作业上传中...'})
    //   ).then(response =>(
    //       _this.uplodTaskCompleteHandler(response)
    // ));
     wx.uploadFile(
     {
      url: ENDPOINT_IMAGE_UPLOAD,
      // url: "http://101.201.152.97:5001/pics/pics-automatic-review",
      filePath: filePath,
      name: "file",
      header:{
        'content-type': 'application/json' // 默认值
      },
      success: function (response) {
        console.log("uploadTask success.");
        _this.uplodTaskCompleteHandler(response);
      },
      fail: function(error){
      	console.error("uploadTask failed,error:",error);
      }
     }
    );
  }
  ,uplodTaskCompleteHandler(response){
    wx.hideLoading();
    console.log("ENDPOINT_IMAGE_UPLOAD response:",response);
    var jsonData = JSON.parse(response.data);
    console.log("response.data:",response.data);
    console.log("response.data:",jsonData);
    var jsonDataFileName = jsonData.data.file_name;
    var jsonDataWidth = jsonData.data.width;
    var jsonDataHeight = jsonData.data.height;
    // var jsonDataWidth = 1080;
    // var jsonDataHeight = 1920;
    console.log("jsonDataFileName:",jsonDataFileName,",jsonDataWidth:",jsonDataWidth,",jsonDataHeight:",jsonDataHeight);
    //save it.
    setGlobalData("uploadedImages",jsonDataFileName);
    //
    var imagePreviewObj = {filePath:getGlobalData("withImages"),fileName:jsonDataFileName,width:jsonDataWidth,height:jsonDataHeight};
    setGlobalData('imagePreview',imagePreviewObj);
    // // go to imagedReviewHandler
    // this.imagedReviewHandler(jsonDataFileName);
    //
    //
    this.calculateAspectRatioByRaw2Device(imagePreviewObj);
    // this.aspectRatioPreHandler(imagePreviewObj);
   }
})