require.config({
  baseUrl: 'lib',
  paths: {
    'jquery': 'jquery.min',
    'art-template': 'template-web',
    'jedate': 'jedate/jquery.jedate.min',
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
    }
  }
})

require(['domReady!', 'router/router', 'jquery', 'module/dateformat'], (doc, router, $, dformat) => {
  router.init()

  // 日期
  setInterval(() => {
    let d = new Date()
    $('input[name="date"]').val(dformat(d, 'yyyy-MM-dd'))
    $('input[name="time"]').val(dformat(d, 'hh:mm:ss'))
    $('input[name="day"]').val(dformat(d, 'w'))
  }, 1000)

  // 点击菜单修改按钮背景
  $('#menu ul li a').on('click', function() {
    $('#menu ul li a').removeClass('active')
    $(this).addClass('active')
  })
})
