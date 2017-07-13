/* eslint-disable no-undef */
define(['art-template', 'text!tpl/report.html'], function (template, tpl) {
  function render (el, data) {
    var render = template.compile(tpl)
    var html = render(data)
    document.getElementById(el).innerHTML = html
  }
  return function () {
    render('router-view', {str: '我是页面report'})
  }
})
