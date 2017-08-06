define(() => {
  // 策略对象
  let strategies = {
    isNonEmpty: function ( value, errorMsg ) {
      if ( value === '' ) {
        return {
          errorMsg: errorMsg,
          dom: this
        }
      }
      return null
    },
    isNumber: function (value, errorMsg) {
      if (isNaN(value)) {
        return {
          errorMsg: errorMsg,
          dom: this
        }
      }
      return null
    },
    minLength: function( value, length, errorMsg ){ // 限制最小长度
      if ( value.length < length ){
        return {
          errorMsg: errorMsg,
          dom: this
        }
      }
      return null
    },
    minValue: function (value, minValue, unit, errorMsg) {
      if (parseInt(value) < parseInt(minValue)) {
        return {
          errorMsg: errorMsg + '' + minValue + '' + unit,
          dom: this
        }
      }
      return null
    }
  }

  class Validator {
    constructor () {
      this.cache = []
    }

    add (dom, rules) {
      let domArr = dom.length > 1 ? Array.prototype.slice.call(dom) : [dom]
      domArr.forEach(dom => {
        rules.forEach((rule) => {
          let strategyAry = rule.strategy.split(':')
          let errmsg = rule.errorMsg
          this.cache.push(() => {
            let strategy = strategyAry.shift();
            strategyAry.unshift(dom.value)
            strategyAry.push(errmsg)
            return strategies[strategy].apply(dom, strategyAry)
          })
        })
      })
    }

    start () {
      for(let i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
        let errObj = validatorFunc()
        if (errObj) {
          return errObj
        }
      }
    }
  }

  return Validator
})