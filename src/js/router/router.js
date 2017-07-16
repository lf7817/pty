define(['router/routes', 'director', 'jquery', 'module/timer'], function (Routes, Router, $, timer) {
  let m = ['home', 'user', 'warning', 'report']
  let router = Router(Routes)
  router.configure({
    before () {
      clearDom()
      timer.clear()
      hightLightMenuBtn()
    }
  })

  function clearDom () {
    $('#router-view').children().remove()
  }

  function hightLightMenuBtn () {
    let r = window.location.href.match(/#\/(\w)+/g)[0].slice(2)
    if (-1 === m.indexOf(r)) return
    $('#menu ul li a').removeClass('active')
    $('#menu-' + r).attr('class', 'active')
  }
  return router
})
