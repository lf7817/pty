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

require(['domReady!', 'router/router'], (doc, router) => {
  router.init()
  setInterval(() => {
    let date = new Date()

  }, 1000)
})
