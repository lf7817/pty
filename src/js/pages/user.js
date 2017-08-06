/* eslint-disable no-undef */
define(['jquery', 'layer'], function ($, layer) {

  // 退出
  function signout () {
    return $.ajax({
      type: 'get',
      // async: false,
      url: host + 'user/signout',
      dataType: 'json',
      crossDomain: true,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        layer.msg('正在退出')
      }
    })
  }

  return function () {

    $('#signout').on('click', function () {
      signout().done(data => {
        layer.msg(data.msg)
        if (data.code === 0) window.location.href = '/index.html'
      })
    })
  }
})
