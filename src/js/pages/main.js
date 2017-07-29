/* eslint-disable no-undef */
define(['jquery', 'art-template', 'layer', 'module/timer', 'module/pty', 'cookie'], function ($, template, layer, timer, Pty) {
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

    // 模式切换
    $('#app-animation').on('click', '.select-mode', function () {
      let oldMode = pty.mode
      let mode = $(this).attr('data-mode')
      let title, content, skin
      if (mode === '0') {
        title = '手动模式设置'
        skin = 'layer-mode'
        content = template('tpl-mode-sd', {})
      } else if (mode === '1') {
        title = '时间控制模式设置'
        skin = 'layer-mode'
        content = template('tpl-mode-time', {})
      } else {
        title = '水分控制模式设置'
        skin = 'layer-mode'
        content = template('tpl-mode-water', {})
      }
      layer.open({
        type: 1,
        title: title,
        skin: skin,
        closeBtn: 1,
        anim: 2,
        shadeClose: true,
        content: content
      });
    })
  }
})
