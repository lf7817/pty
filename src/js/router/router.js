define(['router/routes', 'director', 'jquery', 'module/timer'], function (Routes, Router, $, timer) {
  let router = Router(Routes)
  router.configure({
    before () {
      clearDom()
      timer.clear()
    }
  })

  function clearDom () {
    $('#router-view').children().remove()
  }

  return router
})
