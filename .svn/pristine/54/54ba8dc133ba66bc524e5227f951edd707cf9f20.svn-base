export default {
  methods: {
    authValidator(val) {
      if (!val) {
        return
      }
      var permissionListStr = localStorage.getItem('permissionList')
      var permissionList = JSON.parse(permissionListStr)
      // console.log('localStorage', localStorage)
      console.log('localStorage.permissionList', permissionList)
      switch (true) {
        case val.constructor == Object && permissionList[val.name]:
          console.log('object', val)
          val.auth = true
          break;
        case val.constructor == Array && !!val.length:
          console.log('array', val)
          val.forEach(function (item) {
            if (permissionList[item.name]) {
              item.auth = true
            } else {
              item.auth = false
            }
          })
          break;
        case typeof val == 'string':
          if (permissionList[val]) {
            return true
          } else {
            return false
          }
          break;
        default:
          return false
      }
      console.log('leave', val)
    }
  }
}