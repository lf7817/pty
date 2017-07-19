/* eslint-disable no-undef */
define(['art-template'], function (template) {
  return function () {
    let dat = {
      list:[{
        time: '07-07 06:21:28',
        objname: 'Data0',
        type: '上限报警',
        event: '报警产生',
        currentvalue: 120,
        jxz: '界限值',
        desc: '报警描述'
      },{
        time: '07-07 06:21:28',
        objname: 'Data0',
        type: '上限报警',
        event: '报警产生',
        currentvalue: 120,
        jxz: '界限值',
        desc: '报警描述'
      },{
        time: '07-07 06:21:28',
        objname: 'Data0',
        type: '上限报警',
        event: '报警产生',
        currentvalue: 120,
        jxz: '界限值',
        desc: '报警描述'
      },{
        time: '07-07 06:21:28',
        objname: 'Data0',
        type: '上限报警',
        event: '报警产生',
        currentvalue: 120,
        jxz: '界限值',
        desc: '报警描述'
      },{
        time: '07-07 06:21:28',
        objname: 'Data0',
        type: '上限报警',
        event: '报警产生',
        currentvalue: 120,
        jxz: '界限值',
        desc: '报警描述'
      }]
    }

    let html = template('tpl-warning', dat)
    document.getElementById('warning-table-body').innerHTML = html
  }
})
