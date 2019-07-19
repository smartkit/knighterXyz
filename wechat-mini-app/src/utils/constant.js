const debug = true
const staticDomain = 'https://resource.limixuexi.com/'
const tikuUrl = 'https://tb-mp.limixuexi.com/indexStudySyn.html'
const image = staticDomain + 'image/'
const file = staticDomain + 'file/'
const version = 'v1.4.7'
const debugPage = ''
const wait = 300
const endOpt = {
  leading: true,
  trailing: false
}
const pageConfig = {
  login: 'login',
  main: 'main'
}
// const apiDoamin = 'https://api-xuexi.limixuexi.com/'
const apiDoamin = 'https://automatic-review.limixuexi.com/'
// const mpName = '狸米同步'
const mpName = '狸米判题'
const assetsPath = '../../assets/'
const assetsImg = assetsPath + 'img/'
const assetsIcon = assetsPath + 'icon/'
const assetsBg = assetsPath + 'bg/'
const unitsPath = '../../units/'
const tplPath = '../../templates/'

wx.limi.constant = {
  debug,
  image,
  file,
  version,
  debugPage,
  tikuUrl,
  wait,
  endOpt,
  pageConfig,
  apiDoamin,
  mpName,
  assets: {
    assetsImg,
    assetsIcon,
    assetsBg
  },
  modules: {
    unitsPath,
    tplPath
  }
}