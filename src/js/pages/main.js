/* eslint-disable no-undef */
define(['jquery', 'art-template',
  'layer', 'module/timer', 'module/pty', 'module/Validator',
  'switch', 'cookie', 'jedate'], function ($, template, layer, timer, Pty, Validator, sw, jedate) {
  let pty = new Pty()

  let render = () => {
    return pty.getData(null).done(data => {
      pty.analyse(data.param)
      pty.render()
    })
  }

  function confirm (msg, ruleId, opera) {
    layer.confirm(msg, {
      btn: ['确定','取消'] //按钮
    }, function(){
      pty.opera({
        ruleId: ruleId,
        opera: opera,
        cookie: ''
      })
      layer.close(layer.index)
    });
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
      strategy: 'minValue:3:分钟',
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
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
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
      strategy: 'minValue:3:分钟',
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
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    }])
    v.add(form.ggsc, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
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
      strategy: 'minValue:3:分钟',
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
    v.add(form.openbeng, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    },{
      strategy: 'isNumber',
      errorMsg: '请输入数字'
    },{
      strategy: 'minValue:3:分钟',
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

    // 关阀
    $('#app-animation').on('click', '.fa-closebtn', function () {
      let ruleId = $(this).attr('data-ruleId')
      let index = $(this).attr('data-index')
      confirm('是否关闭' + index + '号大棚阀门?', ruleId, 'close')
    })

    // 手动模式
    $('#app-animation').on('click', '#mode-handle', function () {
      let oldMode = pty.mode
      if (oldMode === '0') {
        layer.msg('当前已处在手动模式')
      } else if (oldMode === '1') {
        layer.alert('请先停止时间控制模式！')
      } else if (oldMode === '2') {
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
            // TODO: 下发命令
          }
          e.preventDefault()
        })
        $('#mode-handle-btn-default').on('click', setHandleModeDefault)
      }
    })

    // 时间模式
    $('#app-animation').on('click', '#mode-time', function () {
      let oldMode = pty.mode
      if (oldMode === '1') {
        layer.msg('当前已处在时间控制模式')
      } else if (oldMode === '' || oldMode === '0') {
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
            // TODO: 下发命令
          }
          e.preventDefault()
        })

        // 填充默认值
        $('#mode-time-btn-default').on('click', setTimeModeDefault)

      } else {
         layer.alert('请先停止水分控制模式！')
      }
    })

    // 水分模式
    $('#app-animation').on('click', '#mode-auto', function () {
      let oldMode = pty.mode
      if (oldMode === '2') {
        layer.msg('当前已处在水分控制模式')
      } else if (oldMode === '' || oldMode === '0') {
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
            // TODO: 下发命令
          }

        })

        // 填充默认值
        $('#mode-auto-btn-default').on('click', setAutoModeDefault)

      } else {
        layer.alert('请先停止时间控制模式！')
      }
    })
  }
})
