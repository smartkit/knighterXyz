var libs=[
  require('./easeljs-0.8.2.for.minapp.js'),
  require('./tweenjs-0.6.2.combined.js')
]
var nb={}
for(var i in libs){
  nb = Object.assign(nb,libs[i])
}

module.exports = nb