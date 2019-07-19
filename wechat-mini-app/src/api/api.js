let api = {
  getKsUnitList: 'unit/api-unit-list',
  getBookGrade:'book/api-get-grade',
  getPublisher:'book/new-api-get-publisher',
  authorize: 'member/tb-authorize',
  switchBook:'book/api-switch-books',
  // sendMSN: 'member/send',
  // bind: 'member/bind',
  sendMSN: 'pics/send-code',
  bind: 'pics/is-bind',
  getUserInfo: 'member/get-user-info',
  updateUserInfo: 'userinfo/update-user-info',
  taskSubmit: 'task/api-task-submit',
  getTaskList: 'student-task/api-task-message-list',
  leaveClass:'join-class/api-leave-class',
  uploadDefaultAvatar:'userinfo/default-avatar',
  getDetail:'user-course-info/api-get-detail',
  getStuInfoExt: 'student-task/get-student-info-ext',
  wxsoftUploadAvatar:'userinfo/wxsoft-upload-avatar',
  postAuthUserInfo: 'member/decrypt-data',
  getExtraInfo: 'student-task/activity-is-open',
  loginout: 'member/logout'
}
Object.keys(api).forEach(v => api[v] = wx.limi.constant.apiDoamin + api[v])
api.sendVoiceCode = 'https://api-sso.limixuexi.com/verifycode-login/send-voice-verifycode'
module.exports = api