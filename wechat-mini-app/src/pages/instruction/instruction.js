//instruction.js
//获取应用实例

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
},
onLoad: function(option){
      console.log("onLoad:",option)
    }
})