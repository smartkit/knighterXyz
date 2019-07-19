const {getGlobalData} = require('../utils/handle_data.js')
const {showToast} = require('../utils/feedback.js')

const sharePage = (res) => {
  const defaultConfig = {
    title: '测试分享',
    path: '/pages/member/member',
    imageUrl: 'https://resource.limixuexi.com/image/avatar/t01.png'
  }
  // Custom share msg from globalData
  /* const share = Object.assign({}, defaultConfig, res)
  if (getGlobalData().shareID) {
    share.path = share.path + '?shareID=' + shareID
  } */
  return {
    ...share,
    success(r) {
      showToast({
        title: '转发成功~'
      })
    },
    fail(e) {
      if (e.errMsg.indexOf('cancel')) {
        showToast({
          title: '转发取消'
        })
      } else {
        showToast({
          title: '转发失败，可重新转发~'
        })
      }
    }
  }
}

module.exports = {
  onShareAppMessage: res => sharePage(res)
}