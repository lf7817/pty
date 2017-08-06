/* eslint-disable no-undef */
define(['art-template', 'jedate'], function (template) {
  template.defaults.imports.dateFormat =  function (date, format) {
    if (typeof date === "string") {
      var mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
        date = parseInt(mts[2]);
      }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
      return "";
    }
    var map = {
      "M": date.getMonth() + 1, //月份
      "d": date.getDate(), //日
      "h": date.getHours(), //小时
      "m": date.getMinutes(), //分
      "s": date.getSeconds(), //秒
      "q": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
      var v = map[t];
      if(v !== undefined){
        if(all.length > 1){
          v = '0' + v;
          v = v.substr(v.length-2);
        }
        return v;
      }
      else if(t === 'y'){
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  }

  function getWarning (startAt, endAt) {
    return $.ajax({
      type: 'post',
      url: host + 'errorTable/history',
      dataType: 'json',
      data: JSON.stringify({
        startAt: startAt,
        endAt: endAt
      }),
      crossDomain: true,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      }
    })
  }
  return function () {
    $('input[name="start-time"]').jeDate({
      format:'YYYY/MM/DD',
      isinitVal:true,
      initAddVal:{MM:"-1"},   //初始化日期加3个月
      zIndex: 9999999999999999
    })

    $('input[name="stop-time"]').jeDate({
      format:'YYYY/MM/DD',
      isinitVal:true,
      zIndex: 9999999999999999
    })
    let startAt = $('input[name="start-time"]').val()
    let endAt = $('input[name="stop-time"]').val()

    getWarning(startAt, endAt).done(data => {
      if (data.code !== 0) alert('请重新登陆！')
      let html = template('tpl-warning', {list: data.param})
      document.getElementById('warning-table-body').innerHTML = html
    })

    $('#warning-search').on('click', function () {
      startAt = $('input[name="start-time"]').val()
      endAt = $('input[name="stop-time"]').val()

      getWarning(startAt, endAt).done(data => {
        if (data.code !== 0) alert('请重新登陆！')
        let html = template('tpl-warning', {list: data.param})
        document.getElementById('warning-table-body').innerHTML = html
      })
    })


  }
})
