// date 需格式化的时间 format格式
function getDateTimeStr(date, format) {
  let dateTime = new Date(date)
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  month = month.toString().length < 2 ? ('0' + month) : month
  let day = dateTime.getDate()
  day = day.toString().length < 2 ? ('0' + day) : day
  let hours = dateTime.getHours()
  hours = hours.toString().length < 2 ? ('0' + hours) : hours
  let minutes = dateTime.getMinutes()
  minutes = minutes.toString().length < 2 ? ('0' + minutes) : minutes
  let seconds = dateTime.getSeconds()
  seconds = seconds.toString().length < 2 ? ('0' + seconds) : seconds

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}



export default function (opts) {
  const defaultOpts = {
    timeKey: 'time',
    valueKey: 'value',
    period: 15 * 60,
    beginTime: moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"),
    endTime: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss"),
    valueMin: 1,
    valueMax: 100,
    precision: 2
  }
  opts = opts ? Object.assign(defaultOpts, opts) : defaultOpts
  let dataArr = []
  let _beginTime = +new Date(opts.beginTime)
  let _endTime = +new Date(opts.endTime)
  while (_endTime > _beginTime) {
    let dataObj = {}
    dataObj[opts.timeKey] = getDateTimeStr(_beginTime)

    let value = (opts.valueMax * Math.random() + opts.valueMin).toFixed(opts.precision)
    value > opts.valueMax ? value - opts.valueMin : value
    dataObj[opts.valueKey] = value
    dataArr.push(dataObj)
    _beginTime += opts.period * 1000
  }
  return dataArr
}