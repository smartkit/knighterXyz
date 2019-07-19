const {Promise} = require('./utils.js')
const {hasKeyObject} = require('./utils.js')

// 获取与设置
class hadnleData {
  setData() {

  }
  getData() {
    
  }
}
const setUserInfo = (key, name) => {
  return new Promise((resolve, reject) => {
    let userInfo = getApp().userInfo || {}
    if (hasKeyObject(key)) {
      Object.keys(key).forEach(v => {
        userInfo[v] = key[v]
      })
    } else {
      userInfo[key] = name
    }
    resolve(userInfo)
  })
    .catch(
      e => console.log('setUserInfo error', JSON.stringify(e, null, 4))
    )
}
const getUserInfo = key => {
  let userInfo = getApp().userInfo
  return key ? (userInfo[key] || '') : userInfo
}

// Global globalData
const setGlobalData = (key, name) => {
  return new Promise((resolve, reject) => {
    let globalData = getApp().globalData
    if (hasKeyObject(key)) {
      Object.keys(key).forEach(v => {
        globalData[v] = key[v]
      })
    } else {
      globalData[key] = name
    }
    resolve(globalData)
  })
    .catch(
      e => console.log('setGlobalData error', JSON.stringify(e, null, 4))
    )
}
const getGlobalData = key => {
  let globalData = getApp().globalData
  return key ? (globalData[key] || '') : globalData
}

module.exports = {
  setUserInfo,
  getUserInfo,
  setGlobalData,
  getGlobalData
}