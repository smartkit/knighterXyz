//index.js
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
// const jsonPatch = require('JSONPatch')
import { STATIC_ICON_RIGHT, STATIC_ICON_QUESTION, STATIC_ICON_SIZE, ENDPOINT_IMAGE_REVIEW } from '../../constants/api-endpoints'
const { jsonpatch } = wx.limi.utils

Page({
  data: {
    shareImage: null,
    imageResult: {},
    painting: {},
    shareImage: '',
    canvasWidth: 0,
    canvasHeight: 0,
    isPainting: true,
  },
  onLoad () {
    var global_imagePreview = getGlobalData('imagePreview');
    console.log("@ResultPage.onLoad,global_imagePreview:",global_imagePreview);
    //display place holder
    this.setData({shareImage:global_imagePreview.filePath});
    // //
    // this.setData({canvasWidth:global_imagePreview.width});
    // this.setData({canvasHeight:global_imagePreview.height});
    //
    var global_wx_openid = getGlobalData("wx_openid");
    console.log("global_wx_openid:",global_wx_openid);
    //
    var global_aspectRatio = getGlobalData('aspectRatio');
    console.log("global_aspectRatio:",global_aspectRatio);
    //update the painting canvas size;
    this.setData({
      canvasWidth: global_aspectRatio.resizedWidth,
      canvasHeight: global_aspectRatio.resizedHeight
    });
    //
    this.imagedReviewHandler(global_imagePreview.fileName,global_wx_openid);
  }
  ,reviewTaskCompleteHandler(response){
     // wx.hideToast();
      console.log("reviewTaskCompleteHandler.response:",response);
  //
      console.log("response.data:",response.data);
      var jsonData = response.data.data;
      console.log("response.data.data:",jsonData);
      //transfer to Result page.
      setGlobalData('imageResult',jsonData);
    //
    // this.aspectRatioHandler();
    //
    if(undefined!=response.data && undefined != response.data.data){
      if(response.data.data.questions.length){
        this.paintingHandler();
      }else{
        this.noneResultsHandler();
      }
    }else{
      this.noneResultsHandler();
    }
  }
  ,noneResultsHandler(){
    console.warn("none of review result.");
      wx.showModal({
            title: '提示',
            content: '未检测到可以识别的数学题型.',
            showCancel: true,
            confirmColor:'#30b1f3',
            cancelText:'使用说明',
            confirmText:'再拍一张',
            success: function(res) {
                if (res.confirm) {
                    console.log('noneResultsHandler with user confirmed.');
                     // 跳转到目的页面，打开新页面
                    wx.redirectTo({
                      url: '/pages/index/index'
                    })
                }
                if (res.cancel) {
                    console.log('noneResultsHandler with user canceled.');
                     // 跳转到目的页面，打开新页面
                    wx.redirectTo({
                      url: '/pages/instruction/instruction'
                    })
                }

            }
      });
  }
  ,imagedReviewHandler(image_file_name,wx_openid_){
    var _this = this;
    // wx.showToast({title: '判题中...',icon: 'loading'});
//Notice:https://zhuanlan.zhihu.com/p/26991549
    wx.request({
        url: ENDPOINT_IMAGE_REVIEW,
        data: {
          file_name: image_file_name
          ,wx_openid: wx_openid_
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
        ,success: function(res){
            // console.log('imagedReviewHandler response:',res);
            _this.reviewTaskCompleteHandler(res);
        }
      });
  }
  ,paintingHandler(){
    //prepare the painting data.
    var src = getGlobalData('imageResult');
    var global_aspectRatio = getGlobalData('aspectRatio');
    console.log("global_aspectRatio:",global_aspectRatio);
    //update the painting canvas size;
    this.setData({
      canvasWidth: global_aspectRatio.resizedWidth,
      canvasHeight: global_aspectRatio.resizedHeight
    });
     // json patch  from imageResult to painting,@see: https://github.com/bruth/jsonpatch-js
    this.jsonPatchAndPaintingHandler(src, global_aspectRatio);
  }
  ,onShow(){
    this.setData({ isPainting: true });
  }
,onReady () {
    //

}
,jsonPatchAndPaintingHandler(src, aspectRatioObj){
  //
  // var src = getGlobalData('imageResult');
  var rWidth = aspectRatioObj.resizedWidth;
  var rHeight = aspectRatioObj.resizedHeight;
  var scaledX = aspectRatioObj.scaleX;
  var scaledY = aspectRatioObj.scaleY;
  var oWidth = aspectRatioObj.rawImgWidth;
  var oHeight = aspectRatioObj.rawImgHeight;
  //
  console.log("global_aspectRatio:",aspectRatioObj);
  //
  var paintingObj = {clear: true, views: []};
  // var jsonStrOfPainting = JSON.stringify(paintingObj);
  // console.log("jsonStrOfPainting:",jsonStrOfPainting);     
  var thePatchers = [
    { "op": "add", "path": "/width", "value": rWidth }
    ,{ "op": "add", "path": "/height", "value": rHeight }
  ]  
  console.log("before painting, rWidth:",rWidth,",rHeight:",rHeight);
  //first off, background
  var patchedObj_bg = { 
      type: 'image',
      // url: 'http://101.201.152.97:5000/statics/review-images/fraction-div-20190111-086.jpeg',
      url: src.image,
      top: 0,
      left: 0,
      width: rWidth,
      height: rHeight
    };
  var patcher_bg = { "op": "add","path": "/views/0", "value": patchedObj_bg};
  thePatchers.push(patcher_bg);
// //1.bg
//   var patchedpaintingObj = jsonPatch.apply_patch(paintingObj, thePatchers);
//   console.log("final patchedpaintingObj:",patchedpaintingObj);
//   //finally update the binding obj.
//   this.setData({painting: patchedpaintingObj});
  ////2.y_n
  var totalIndex=0;
  var _this = this;
  //for loop the src's question array
  src.questions.forEach( function(question,index) { 
      totalIndex++;
      // console.log("forEached question:",question,",and index:",index,",and totalIndex:",totalIndex);
       // ... do something with question ...
      //  var patchedObj = { 
      //   type: 'rect',
      //   background: question.correct>0?'green':'red',
      //   left: question.area.x,
      //   top: question.area.y,
      //   width: question.area.width,
      //   height: question.area.height
      // };
      var offsetX = question.area.width * scaledX - STATIC_ICON_SIZE/2;
      var offsetY = question.area.height * scaledY - STATIC_ICON_SIZE/2;
      console.log("offsetX:",offsetX,",offsetY:",offsetY);
      //
      var patchedObj_y_n = { 
            type: 'image',
            // url: '/assets/images/auto_right.png',
            url: (1==question.correct)?STATIC_ICON_RIGHT:STATIC_ICON_QUESTION,
            // left: (question.area.x + question.area.width+STATIC_ICON_SIZE/2)*scaledX,
            left: (question.area.x)*scaledX+offsetX,
            // top: (question.area.y + question.area.height/2-STATIC_ICON_SIZE/2)*scaledY,
            top: (question.area.y)*scaledY+offsetY,
            width: STATIC_ICON_SIZE,
            height: STATIC_ICON_SIZE
       }; 
       console.log("patchedObj_y_n.left:",patchedObj_y_n.left,",patchedObj_y_n.top:",patchedObj_y_n.top);
       if(patchedObj_y_n.left>_this.data.canvasWidth){
          console.warn("!!!TOO MUCH WIDTH!")

        }
        if(patchedObj_y_n.top>_this.data.canvasHeight){
          console.warn("!!!TOO MUCH HEIGHT!")
        }
       // console.log("patchedObj_y_n:",patchedObj_y_n);
       if(totalIndex<=999){
         var patcher_y_n = { "op": "add","path": "/views/"+totalIndex, "value": patchedObj_y_n};
         thePatchers.push(patcher_y_n);
        }else{
          console.warn("TOO MUCH TASKS for CANVAS");
        }
       // console.log("thePatchers updated to:",thePatchers);
       // var patcher = { "op": "add","path": "/views/"+index, "value": patchedObj};
       // thePatchers.push(patcher);
     }
);
  //
  var patchedpaintingObj = jsonpatch.apply_patch(paintingObj, thePatchers);
  console.log("final patchedpaintingObj:",patchedpaintingObj);
  //finally update the binding obj for painting.
  this.setData({painting: patchedpaintingObj});
  //end of painting.
  // this.data.isPainting = false;
  var _this = this;
  setTimeout(function(){ _this.setData({isPainting: false}); }, 2000);//2s delay to smooth.
}
,eventSave () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success (res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
  })
}
,btn_plus_one_tap_handler(event){
  // 跳转到目的页面，打开新页面
  wx.navigateTo({
    // url: '/pages/results/result?image='+this.state.withResults
    url: '/pages/index/index'
  })
}
,eventGetImage (event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
}

})
