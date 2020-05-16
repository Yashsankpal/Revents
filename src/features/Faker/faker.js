const moment = require("moment");

console.log(moment(new Date()).toISOString())
let x = moment(new Date()).toISOString()
x = x.split('T')
console.log(x)