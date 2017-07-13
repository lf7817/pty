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

require(['domReady!', 'router/router', 'jquery', 'module/dateformat'], (doc, router, $, format) => {
  router.init()

  // 日期
  setInterval(() => {
    let d = new Date()
    $('input[name="date"]').val(format(d, 'yyyy-MM-dd'))
    $('input[name="time"]').val(format(d, 'hh:mm:ss'))
    $('input[name="day"]').val(format(d, 'w'))
  }, 1000)

  // 点击菜单修改按钮背景
  $('#menu ul li a').on('click', function() {
    $('#menu ul li a').removeClass('active')
    $(this).addClass('active')
  })
})
