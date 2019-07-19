const {showModal} = require('./feedback.js')
const {Promise} = require('./utils.js')
/*
Why need name arguments?
When call wx.login to get code error need skip load_fail page
So can skip ok
*/
const checkNetworkType = (name) => {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success(res) {
        if (res.networkType === 'none') {
          showModal({
            content: '当前网络不可用，请检查网络...',
            showCancel: false,
            confirmText: '我知道了'
          })
            .then(() => {
              if (name === 'load_fail') {
                resolve(1)
              } else {
                resolve(0)
              }
            })
        } else {
          resolve(1)
        }
      }
    })
  })
    .catch(
      e => console.log('getNetworkType error', JSON.stringify(e, null, 4))
    )
}

module.exports = checkNetworkType

