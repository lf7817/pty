/* eslint-disable no-undef */
define(['jquery', 'module/timer', 'module/pty', 'module/encode64'], function ($, timer, Pty, encode64) {
  let pty = new Pty()
  function getData (orgId) {
    return $.ajax({
      // url: host + 'propertyRule/listmachine',
      url: '../assets/listmachine.json',
      type: 'get',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        'orgId': orgId
      }),
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  return function (param) {
    getData().done(data => {
      pty.analyse(data.param)
      pty.render()
    })

    setInterval(() => {
      getData().done(data => {
        pty.analyse(data.param)
        pty.render()
      })
    }, 2000)
  }
})
