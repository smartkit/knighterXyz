const {showModal} = require('./feedback.js')
// 基础库版 本比较
// >= 0
// < 0 
const compareVersion = (version) => {
  let v1 = version.split('.')
  let v2 = wx.getSystemInfoSync().SDKVersion.split('.')
  let len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    let num1 = parseInt(v1[i])
    let num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

// 接口兼容检测
const checkApi = api => {
  if (wx[api]) {
    return true
  } else {
    showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

// 接口属性、方法、新增组件兼容检测
// 当返回值为undefined时，data属性名将不显示
const checkProp = prop => wx.canIUse(prop)

module.exports = {
  compareVersion,
  checkApi,
  checkProp
}