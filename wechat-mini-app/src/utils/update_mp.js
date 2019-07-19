const {showModal} = require('./feedback.js')

const updateMP = () => {
  // 新版检查由微信在小程序冷启动时自触发
  // 更新的下载，在小程序检查到新版本时，自下载
  // 新版本的检查结果及下载结果通过相对的API通知开发者，不由开发者控制
  const updater = wx.getUpdateManager()
  // 监听是否有新版本
  updater.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      // 监听新版本下载成功
      updater.onUpdateReady(() => {
        showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？'
        })
          .then(res => {
            if (res.code) {
              // 强制重启应用新版本，不需要等到下一次应用新版本
              updater.applyUpdate()
            }
          })
      })
      // 监听新版本下载失败
      updater.onUpdateFailed(() => {
        showToast({
          title: '新版本下载失败'
        })
      })
    }
  })
}

module.exports = updateMP