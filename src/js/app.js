let host = 'http://192.168.2.117:8080/cao/'
let cookie = ''

require.config({
  urlArgs: 'ver=' + 1025,
  baseUrl: 'lib',
  paths: {
    'jquery': 'jquery.min',
    'bootstrap': 'bootstrap/js/bootstrap.min',
    'art-template': 'template-web',
    'jedate': 'jedate/jquery.jedate.min',
    'cookie': 'jquery.cookie',
    'switch': 'bootstrap-switch/bootstrap-switch.min',
    'layer': 'layer/layer',
    'laypage': 'laypage/laypage',
    'module': '../js/modules',
    'router': '../js/router',
    'page': '../js/pages',
    'tpl': '../template'
  },
  shim: {
    'director': {
      exports: 'Router'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'cookie': {
      deps: ['jquery']
    },
    'switch': {
      deps: ['jquery']
    }
  }
})

require(['domReady!', 'router/router', 'jquery', 'module/dateformat', 'cookie'], (doc, router, $, dformat, cookie) => {
  getUserDetail().done(data => {
    if (data.code !== 0) {
      alert('请重新登录！')
      window.location.href = '../index.html'
    }
    cookie = $.cookie()
  })


  router.init()
  if (window.location.hash === '') window.location.href = '#/main'
  
  // 日期
  setInterval(() => {
    let d = new Date()
    $('input[name="date"]').val(dformat(d, 'yyyy-MM-dd'))
    $('input[name="time"]').val(dformat(d, 'hh:mm:ss'))
    $('input[name="day"]').val(dformat(d, 'w'))
  }, 1000)
})

/**
 * 获取用户详情信息
 * @returns {*}
 */
function getUserDetail () {
  return $.ajax({
    type: 'get',
    // async: false,
    url: host + 'user/detail',
    dataType: 'json',
    crossDomain: true,
    contentType: 'application/json',
    xhrFields: {
      withCredentials: true
    }
  })
}