/* eslint-disable no-undef */
define(['jquery', 'art-template', 'jedate', 'bootstrap'], function ($, template, jedate) {
  let pbq = [], runData = [], pageCount = 0, pageSize = 10, lineHeight = 39.2
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

  function getReport (beginTime, endTime) {
    return $.ajax({
      type: 'get',
      url: host + 'flow/query2?beginTime=' + beginTime + '&endTime=' + endTime,
      dataType: 'json',
      crossDomain: true,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      }
    })
  }

  function handle(data) {
    if (data.code !== 0) {
      alert('请重新登录！')
      return
    }
    pageCount = data.param.pageCount
    pbq = [], runData = []
    if (data.param.length !== 0) {
      data.param.forEach((item, i) => {
        let {pidg, pids, pl, yxdl, yxdy, createAt} = item
        let {kqsd, kqwd, trsf, gzd} = item
        let b = {pidg, pids, pl, yxdl, yxdy, createAt}
        pbq.push(b)
        let tmp_kqsd = kqsd.split(',')
        let tmp_kqwd = kqwd.split(',')
        let tmp_trsf = trsf.split(',')
        let tmp_gzd = gzd.split(',')

        tmp_gzd.forEach((item, index) => {
          let obj = {}
          obj.gzd = tmp_gzd[index]
          obj.kqsd = tmp_kqsd[index]
          obj.kqwd = tmp_kqwd[index]
          obj.trsf = tmp_trsf[index]
          obj.createAt = createAt
          if (!runData[index]) runData[index] = []
          runData[index].push(obj)
        })
      })
    } else {
      runData = [[],[],[],[],[],[],[],[]]
    }

    let html = template('tpl-bpq', {list: pbq})
    document.getElementById('bpq').innerHTML = html

    runData.forEach((item, index) => {
      let html = template('tpl-peng', {list: item})
      document.getElementById('water' + (index + 1)).innerHTML = html
    })
  }

  return function () {
    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

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
    let beginTime = $('input[name="start-time"]').val().split('/').join('')
    let endTime = $('input[name="stop-time"]').val().split('/').join('')

    getReport(beginTime, endTime).done(handle)

    $('#report-search').on('click', function () {
      beginTime = $('input[name="start-time"]').val().split('/').join('')
      endTime = $('input[name="stop-time"]').val().split('/').join('')
      getReport(beginTime, endTime).done(handle)
    })
  }

})
