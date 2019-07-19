const Ajax = require('./ajax.js')
const Api = require('./api.js')
const addPost = (opt) => Object.assign({ method: 'POST' }, opt)

wx.limi.srv = {
  getKsUnitList: opt => Ajax(Api['getKsUnitList'], opt),
  getBookGrade: opt => Ajax(Api['getBookGrade'], opt),
  getPublisher: opt => Ajax(Api['getPublisher'], opt),
  authorize: opt => Ajax(Api['authorize'], addPost(opt)),
  switchBook: opt => Ajax(Api['switchBook'], opt),
  sendMSN: opt => Ajax(Api['sendMSN'], addPost(opt)),
  bind: opt => Ajax(Api['bind'], addPost(opt)),
  getUserInfo: opt => Ajax(Api['getUserInfo'], opt),
  updateUserInfo: opt => Ajax(Api['updateUserInfo'], addPost(opt)),
  taskSubmit: opt => Ajax(Api['taskSubmit'], addPost(opt)),
  leaveClass: opt => Ajax(Api['leaveClass'], opt),
  getTaskList: opt => Ajax(Api['getTaskList'], opt),
  getStuInfoExt: opt => Ajax(Api['getStuInfoExt'], opt),
  sendVoiceCode: opt => Ajax(Api['sendVoiceCode'], addPost(opt)),
  getDetail: opt => Ajax(Api['getDetail'], addPost(opt)),
  uploadDefaultAvatar: opt => Ajax(Api['uploadDefaultAvatar'], addPost(opt)),
  wxsoftUploadAvatar: opt => Ajax(Api['wxsoftUploadAvatar'], addPost(opt)),
  postAuthUserInfo: opt => Ajax(Api['postAuthUserInfo'], addPost(opt)),
  loginout: opt => Ajax(Api['loginout'], opt),
  getExtraInfo: opt => Ajax(Api['getExtraInfo'], opt)
}