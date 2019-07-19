const { routeSkip, debounce, trimAll, validator } = wx.limi.utils
const { srv, constant } = wx.limi

import { ENDPOINT_SEND_CODE } from '../../constants/api-endpoints'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'

Page({
  created(options) {
    console.log(options, option.query)
    // Do some initialize when page load.
  },
  onBtnNextStep() {
    // console.log(this.selectComponent())
    // Do something when page ready.
    // console.log("result router:",this);
    // 跳转到目的页面，打开新页面
    wx.navigateTo({
      // url: '/pages/results/result?image='+this.state.withResults
      url: '/pages/index/index'
    })

  },
  onReady() {
    // console.log(this.selectComponent())
    // Do something when page ready.
    // console.log("result router:",this);
  },
  onLoad: function (option) {
    console.log("onLoad:", option)
  }
})