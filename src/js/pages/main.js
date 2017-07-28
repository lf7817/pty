/* eslint-disable no-undef */
define(['jquery', 'layer', 'module/timer', 'module/pty', 'module/encode64'], function ($, layer, timer, Pty, encode64) {
  let pty = new Pty()

  function render () {
    pty.getData(null).done(data => {
      pty.analyse(data.param)
      pty.render()
    })
  }
  return function (param) {
    layer.alert(1)

    render()
    setInterval(render, 6000)
  }
})
