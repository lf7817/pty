/* eslint-disable no-undef */
define(['art-template', 'text!tpl/home.html', 'module/timer'], function (template, tpl, timer) {
  function render (el, data) {
    var render = template.compile(tpl)
    var html = render(data)
    document.getElementById(el).innerHTML = html
  }

  return function () {
    render('router-view', {str: '我是页面home'})
  }
})
