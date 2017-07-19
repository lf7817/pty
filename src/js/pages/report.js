/* eslint-disable no-undef */
define(['jquery', 'jedate'], function ($) {

  return function () {
    $("#date-fa").jeDate({
      format:"YYYY-MM-DD",
      isTime:false,
      minDate:"2014-09-19 00:00:00"
    })
    $("#date-bpq").jeDate({
      format:"YYYY-MM-DD",
      isTime:false,
      minDate:"2014-09-19 00:00:00"
    })
  }
})
