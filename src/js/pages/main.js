/* eslint-disable no-undef */
define(['jquery', 'art-template','layer', 'module/timer',
  'module/pty', 'module/Validator', 'switch', 'cookie', 'jedate'],
  function ($, template, layer, timer, Pty, Validator, sw, jedate) {
  let layerIndex = null
  let pty = new Pty()

  let render = () => {
    return pty.getData(null).done(data => {
      pty.analyse(data.param)
      pty.render()
      if (pty.quick === true) {
        layerIndex = layer.msg('紧急停止中...', {
          icon: 16
          ,shade: 0.5
          ,time: 0
        })
      } else {
        layer.close(layerIndex)
      }
    })
  }

  function confirm (msg, ruleId, opera) {
    layer.confirm(msg, {
      btn: ['确定', '取消'] //按钮
    }, function () {
      oHandle(ruleId, opera)
    })
  }

  function oHandle (ruleId, opera) {
    let counter = 0
    pty.opera({
      ruleId: ruleId,
      opera: opera,
      cookie: cookie
    }).then(data => {
      render()
      if (data.code == 0 && data.param.sId) {
        let sId = data.param.sId
        // checkCmd(ruleId, counter, sId)
      }
    })
    layer.close(layer.index)
  }

  function checkCmd (ruleId, counter, sId) {
    pty.isOperaSuccess(ruleId, sId).done(endCmd => {
      if (endCmd == 1) {
        layer.msg('操作成功！')
      } else if (endCmd == 2) {
        layer.msg('操作失败！')
      } else if (endCmd == 0) {
        layer.msg('请稍等！命令下发中')
        timer.add(setTimeout(() => {
          if (counter ++ < 10) checkCmd (ruleId, counter, sId)
        }, 2000), 'timeout')
      }
    })
  }

  // 时间模式验证输入
  function checkTimeModeInput (form) {
    let v = new Validator()
    v.add(form.startTime, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    }])
    v.add(form.startDelay, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },,{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:1:分钟',
      errorMsg: '不能小于'
    }])
    v.add(form.stopDelay, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:30:秒',
      errorMsg: '不能小于'
    }])
    v.add(form.ggsc, [{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    }])
    return v.start()
  }
  // 时间模式设置默认值
  function  setTimeModeDefault (e) {
    e.preventDefault()
    $('#mode-time-form input[name="startDelay"]').val(3)
    $('#mode-time-form input[name="stopDelay"]').val(60)
    $('#mode-time-form input[name="ggsc"]').each(function (i, item) {
      item.value = 30
    })
  }

  // 手动模式输入验证
  function checkHandleModeInput (form) {
    let v = new Validator()
    v.add(form.openbeng, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:1:分钟',
      errorMsg: '不能小于'
    }])

    v.add(form.closebeng, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:30:秒',
      errorMsg: '不能小于'
    }])

    return v.start()
  }
  // 手动模式设置默认值
  function  setHandleModeDefault (e) {
    e.preventDefault()
    $('#mode-handle-form input[name="openbeng"]').val(3)
    $('#mode-handle-form input[name="closebeng"]').val(60)
  }

  // 水分控制模式验证输入
  function checkAutoModeInput(form) {
    let v = new Validator()
    v.add(form.sd, [{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    }])
    v.add(form.ggsc, [{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    }])
    v.add(form.openbeng, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:1:分钟',
      errorMsg: '不能小于'
    }])

    v.add(form.closebeng, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:30:秒',
      errorMsg: '不能小于'
    }])

    v.add(form.setTime, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    }])
    return v.start()
  }
  // 水分控制模式设置默认值
  function setAutoModeDefault (e)  {
    e.preventDefault()
    $('#mode-auto-form input[name="openbeng"]').val(3)
    $('#mode-auto-form input[name="closebeng"]').val(60)
    $('#mode-auto-form input[name="setTime"]').val(24)
    $('#mode-auto-form input[name="ggsc"]').each(function (i, item) {
      item.value = 30
    })
    $('#mode-auto-form input[name="sd"]').each(function (i, item) {
      item.value = 30
    })
  }

  return param => {
    render()
    timer.add(setInterval(render, 6000), 'interval')

    // 本远切换
    $('#app-animation').on('click', '.btn-remote', function () {
      let curmode = $(this).attr('data-remote') // 当前模式，0-本地, 1-远程
      let ruleId = $(this).attr('data-ruleId')
      if (curmode === '1') {
        confirm('是否切换到本地模式？', ruleId, 'local')
      } else if (curmode === '0') {
        confirm('是否切换到远程模式？', ruleId, 'remote')
      }
    })

    $('#app-animation').on('click', '#jjtz', function () {
      confirm('是否紧急停止？', null, 'stop')
    })

    $('#app-animation').on('click', '.app-sfa button', function () {
      const ruleId = $(this).attr('data-ruleId')
      const opera = $(this).attr('data-opera')
      if (opera === 'close') {
        confirm('是否关闭施肥阀？', ruleId, 'close')
      } else {
        confirm('是否打开施肥阀？', ruleId, 'open')
      }
    })

    // 关阀
    $('#app-animation').on('click', '.fa-closebtn', function () {
      let ruleId = $(this).attr('data-ruleId')
      let index = $(this).attr('data-index')
      confirm('是否关闭' + index + '号大棚阀门?', ruleId, 'close')
    })

    // 手动模式
    $('#app-animation').on('click', '#mode-handle', function () {
      let oldMode = pty.mode
      if (oldMode === 'handle') {
        layer.msg('当前已处在手动模式')
      } else if (oldMode === 'time') {
        layer.alert('请先停止时间控制模式！')
      } else if (oldMode === 'auto') {
        layer.alert('请先停止水分控制模式！')
      } else if (oldMode === '') {
        layer.open({
          type: 1,
          title: '手动模式设置',
          skin: 'layer-mode-handle',
          closeBtn: 1,
          anim: 2,
          shadeClose: true,
          content: template('tpl-mode-handle', {falist: pty.fa})
        })
        $('[name="switch"]').bootstrapSwitch();
        // 验证表单并提交
        $('#mode-handle-btn').on('click', function (e) {
          let form = document.getElementById('mode-handle-form')
          $('#mode-handle-form input').attr('style','')
          let errObj = checkHandleModeInput(form)
          if (errObj) {
            layer.msg(errObj.errorMsg)
            errObj.dom.style.border = "1px solid red"
          } else { // 输入验证通过
            let start = $('input[name="openbeng"]').val() * 60
            let end = $('input[name="closebeng"]').val() * 1
            let rule = [];
            let type = 'handle'
            $('input[name=switch]').each(function (index, item) {
              if ($(item).bootstrapSwitch('state') === true ) {
                rule.push(index)
              }
            })
            rule = rule.join(',')
            layer.confirm('请确认各个参数',{
              btn: ['确定', '取消']
              },function () {
              layer.closeAll()
              // layer.close(layer.index)
              pty.setMode({type, cookie,start, end, rule})
              }
            )
          }
          e.preventDefault()
        })
        $('#mode-handle-btn-default').on('click', setHandleModeDefault)
      }
    })

    // 时间模式
    $('#app-animation').on('click', '#mode-time', function () {
      let oldMode = pty.mode
      if (oldMode === 'time') {
        layer.msg('当前已处在时间控制模式')
      } else if (oldMode === '') {
        layer.open({
          type: 1,
          title: '时间控制模式设置',
          skin: 'layer-mode-time',
          closeBtn: 1,
          anim: 2,
          shadeClose: true,
          content: template('tpl-mode-time', {falist: pty.fa})
        })

        $("#start-time").jeDate({
          format:'hh:mm:ss',
          zIndex: 9999999999999999
        })

        // 验证表单并提交
        $('#mode-time-btn').on('click', function (e) {
          let form = document.getElementById('mode-time-form')
          $('#mode-time-form input').attr('style','')
          let errObj = checkTimeModeInput(form)
          if (errObj) {
            layer.msg(errObj.errorMsg)
            errObj.dom.style.border = "1px solid red"
          } else { // 输入验证通过
            let type = "time"
            let start = $('input[name="startDelay"]').val() * 60
            let end = $('input[name="stopDelay"]').val() * 1
            let ruletime = []
            let timeArr = $('#start-time').val().split(':')
            let time = {
              h: parseInt(timeArr[0]),
              m: parseInt(timeArr[1]),
              s: parseInt(timeArr[2])
            }
            $('input[name="ggsc"]').each(function (index, item) {
              if (item.value === '') item.value = 0
              ruletime.push(item.value * 60)
            })
            ruletime = ruletime.join(',')
            layer.confirm('请确认各个参数',{
                btn: ['确定', '取消']
              },function () {
              layer.closeAll()
              // layer.close(layer.index)
              pty.setMode({type, cookie, time, start, end, ruletime})
              }
            )
          }
          e.preventDefault()
        })
        // 填充默认值
        $('#mode-time-btn-default').on('click', setTimeModeDefault)

      } else if (oldMode === 'handle') {
        layer.alert('请先停止手动模式！')
      } else {
         layer.alert('请先停止水分控制模式！')
      }
    })

    // 水分模式
    $('#app-animation').on('click', '#mode-auto', function () {
      let oldMode = pty.mode
      if (oldMode === 'auto') {
        layer.msg('当前已处在水分控制模式')
      } else if (oldMode === '') {
        layer.open({
          type: 1,
          title: '水分控制模式设置',
          skin: 'layer-mode-auto',
          closeBtn: 1,
          anim: 2,
          shadeClose: true,
          content: template('tpl-mode-auto', {falist: pty.fa})
        })
        // 验证表单并提交
        $('#mode-auto-btn').on('click', function (e) {
          e.preventDefault()
          let form = document.getElementById('mode-auto-form')
          $('#mode-auto-form input').attr('style','')
          let errObj = checkAutoModeInput(form)
          if (errObj) {
            layer.msg(errObj.errorMsg)
            errObj.dom.style.border = "1px solid red"
          } else { // 输入验证通过
            let type = 'auto'
            let start = $('input[name="openbeng"]').val() * 60
            let end = $('input[name="closebeng"]').val() * 1
            let loop = $('input[name="setTime"]').val() * 1
            let ruletime = []
            let rules = []
            $('input[name="ggsc"]').each(function (index, item) {
              if (item.value === '') item.value = 0
              ruletime.push(item.value * 60)
            })
            ruletime = ruletime.join(',')
            $('input[name="sd"]').each(function (index, item) {
              if (item.value === '') item.value = 0
              rules.push(item.value)
            })
            rules = rules.join(',')
            layer.confirm('请确认各个参数',{
                btn: ['确定', '取消']
              },function () {
              layer.closeAll()
              console.log(ruletime, rules)
              layer.close(layer.index)
              pty.setMode({type, cookie, start, end, loop, rules, ruletime})
              }
            )
          }
        })
        // 填充默认值
        $('#mode-auto-btn-default').on('click', setAutoModeDefault)

      } else if (oldMode === 'handle') {
        layer.alert('请先停止手动模式！')
      } else {
        layer.alert('请先停止时间控制模式！')
      }
    })
  }
})
