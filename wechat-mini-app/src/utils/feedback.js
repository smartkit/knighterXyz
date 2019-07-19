const {Promise} = require('./utils.js')
const failTips = '接口调用失败'
/*
@Desc: 交互反馈
@Code: 说明
@1: 接口调用成功、确定
@0: 取消
@1110: 接口调用失败
@1111: 接口调用完成（省略）
*/
const showModal = (obj = {}) => {
  const def = {
    title: '提示',
    content: '内容',
    cancelColor: '#999',
    confirmColor: '#3897f9'
  }
  const opt = Object.assign({}, def, obj)
  // Resolve showToast:fail parameter error: parameter.title should be String instead of Number;
  opt.title = '' + opt.title
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...opt,
      success(res) {
        if (res.confirm) {
          resolve({
            code: 1,
            result: 'confirm'
          })
        }
        if (res.cancel) {
          resolve({
            code: 0,
            result: 'cancel'
          })
        }
      },
      fail() {
        reject({
          code: 1110,
          result: 'showModal' + failTips
        })
      }
    })
  })
}

const showToast = (obj = {}) => {
  const def = {
    title: '完成',
    mask: true,
    duration: 1500,
    icon: 'none'
  }
  let opt = Object.assign({}, def, obj)
  opt.title = '' + opt.title
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...opt,
      success() {
        resolve({
          code: 1
        })
      },
      fail() {
        reject({
          code: 1110,
          result: 'showToast' + failTips
        })
      }
    })
  })
}

const hideToast = () => wx.hideToast()

const showLoading = (obj = {}) => {
  const def = {
    title: '加载中...',
    mask: true
  }
  let opt = Object.assign({}, def, obj)
  opt.title = '' + opt.title
  return new Promise((resolve, reject) => {
    wx.showLoading({
      ...opt,
      success() {
        resolve({
          code: 1
        })
      },
      fail() {
        reject({
          code: 1110,
          result: 'showLoading' + failTips
        })
      }
    })
  })
}

const hideLoading = () => wx.hideLoading()

const showAS = (obj = {}) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      ...obj,
      success(res) {
        resolve({
          code: 1,
          tapIndex: res.tapIndex
        })
      },
      fail() {
        resolve({
          code: 0
        })
      }
    })
  })
}

module.exports = {
  showModal,
  showToast,
  hideToast,
  showLoading,
  hideLoading,
  showAS
}