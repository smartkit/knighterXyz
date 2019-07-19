const {hasKeyObject, formatQuery, Promise} = require('./utils.js')
const checkNetworkType = require('./check_network_type.js')

const routeSkip = (o = {}) => {
  checkNetworkType(o.name)
    .then(res => {
      if (res) {
        let def = {
          type: 'navigateTo'
        }
        const opt = Object.assign({}, def, o)
        let url = (opt.url ? opt.url : '../../pages/') + opt.name + '/' + opt.name + formatQuery(opt.query)
        return new Promise((resolve, rejct) => {
          let r = {
            code: 0,
            msg: 'Fail'
          }
          wx[opt.type]({
            url,
            success(res) {
              r.code = 1
              r.msg = 'Succ'
              resolve(r)
            },
            fail() {
              resolve(r)
            }
          })
        })
          .catch(e => console.log('routeSkip error', JSON.stringify(e, null, 4)))
      }
    })
}

module.exports = routeSkip