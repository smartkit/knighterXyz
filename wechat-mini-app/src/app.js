wx.limi = {}
require('./utils/constant.js')
require('./utils/index.js')
require('./utils/caniuse.js')
require('./utils/route_skip.js')
require('./api/index.js')
const { showToast, routeSkip } = wx.limi.utils

App({
  userInfo: {
    tel: '',
    uid: '',
    avatar: '',
    bookID: '',
    name: '',
    realTel: '',
    pwd: '',
    isAddClass: '',
    bookName: '',
    bookAllName: '',
    profile: {},
    isVip: false,
    needAuth: false,
    bindState: 0
  },
  globalData: {
    openID: '',
    copyCounterTime: 60,
    counterTime: 60,
    cookie: '',
    questionBook: {
      booksid: '',
      courseid: '',
      openstate: '',
      taskid: '',
      type: ''
    },
    deadlineTime: 7 * 24 * 60 * 60 * 1000, // MS
    playVideo: false,
    // 是否跳转会员服务小程序
    isSkipVipMp: false,
    mpPage: 'tiku_view',
    canOpenWebView: 1,
    courseTastID: ''
  },

  onLaunch: function () {
    
  }
})