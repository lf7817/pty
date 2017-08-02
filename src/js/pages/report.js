/* eslint-disable no-undef */
define(['jquery', 'bootstrap', 'jedate'], function ($) {

  return function () {
    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    $('input[name="start-time"]').jeDate({
      format:'YYYY-MM-DD',
      isinitVal:true,
      initAddVal:{MM:"-1"},   //初始化日期加3个月
      zIndex: 9999999999999999
    })

    $('input[name="stop-time"]').jeDate({
      format:'YYYY-MM-DD',
      isinitVal:true,
      zIndex: 9999999999999999
    })
  }
})
