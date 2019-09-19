export default function (val) {
  if (!val) {
    return
  }
  // var permissionListStr = localStorage.getItem('permissionList')
  // var permissionList = JSON.parse(permissionListStr)
  // // console.log('localStorage', localStorage)
  // console.log('localStorage.permissionList', permissionList)
  var permissionList = []
  try {
    var obj = JSON.parse(sessionStorage.getItem("HjStore"))
    permissionList = obj['login']['userInfo']['permissionList']
  } catch (e) {
    console.error("resolved permission list error")
  }

  // var permissionList = permissionListStr.split(",")
  switch (true) {
    case val.constructor == Object && permissionList.includes(val.name):
      console.log('object', val)
      val.auth = true
      break;
    case val.constructor == Array && !!val.length:
      console.log('array', val)
      val.forEach(function (item) {
        if (permissionList.includes(item.name)) {
          item.auth = true
        } else {
          item.auth = false
        }
      })
      break;
    case typeof val == 'string':
      if (permissionList.includes(val)) {
        return true
      } else {
        return false
      }
      break;
    default:
      return false
  }
  // console.log('leave', val)
}