/* eslint-disable no-undef */
define(['art-template', 'module/ma', 'text!tpl/pa.html'], function (template, ma, tpl) {
  function render (el, data) {
    var render = template.compile(tpl)
    var html = render(data)
    document.getElementById(el).innerHTML = html
  }
  return function () {
    render('router-view', {str: '我是页面AA'})
    ma()
  }
})
