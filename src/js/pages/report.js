/* eslint-disable no-undef */
define(['jquery', 'art-template', 'laypage', 'bootstrap'], function ($, template, laypage) {
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

  function getReport (pageSize, pageNow) {
    return $.ajax({
      type: 'get',
      url: host + 'flow/query?pageSize='+ pageSize +'&pageNow=' + pageNow,
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

    data.param.records.forEach((item, i) => {
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

    let html = template('tpl-bpq', {list: pbq})
    document.getElementById('bpq').innerHTML = html

    runData.forEach((item, index) => {
      let html = template('tpl-peng', {list: item})
      document.getElementById('water' + (index + 1)).innerHTML = html
    })
  }

  function render (pageSize) {
    getReport(pageSize, 1).done(handle)
      .done(data => {
        laypage({
          cont: $('#report-page'), //容器。值支持id名、原生dom对象，jquery对象,
          pages: pageCount, //总页数
          skip: true, //是否开启跳页
          skin: '#AF0000',
          groups: 6, //连续显示分页数
          jump: function (obj, first) {
            let pageNow = obj.curr
            if (!first)
              getReport(pageSize, pageNow).done(handle)
          }
        });
      })
  }



  return function () {
    pageSize = Math.floor(($('.tab-pane').height() - lineHeight) / lineHeight)
    $(window).on('resize', function () {
      pageSize = Math.floor(($('.tab-pane').height() - lineHeight) / lineHeight)
      render(pageSize)
    })

    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
    render(pageSize)
  }

})
