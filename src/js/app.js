let host = 'http://192.168.1.28:8080/cao/'

require.config({
  urlArgs: 'ver=' + 1025,
  baseUrl: 'lib',
  paths: {
    'jquery': 'jquery.min',
    'art-template': 'template-web',
    'jedate': 'jedate/jquery.jedate.min',
    'cookie': 'jquery.cookie',
    'switch': 'bootstrap-switch/bootstrap-switch.min',
    'layer': 'layer/layer',
    'module': '../js/modules',
    'router': '../js/router',
    'page': '../js/pages',
    'tpl': '../template'
  },
  shim: {
    'director': {
      exports: 'Router'
    },
    'WebVideoCtrl': {
      exports: 'WebVideoCtrl'
    },
    'jedate': {
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

require(['domReady!', 'router/router', 'jquery', 'module/dateformat'], (doc, router, $, dformat) => {
  // getUserDetail().done(data => {
  //   if (data.code !== 0) {
  //     alert('请重新登录！')
  //     window.location.href = '../index.html'
  //   }
  // })

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