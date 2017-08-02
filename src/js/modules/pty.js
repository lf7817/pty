define(['jquery', 'art-template', 'module/encode64'], ($, template, encode64) => {
  class Pty {
    constructor () {
      this.mode = 0;
      this.beng = {} // 泵
      this.sfa = {} // 施肥阀
      this.fa = [] // 电磁阀
    }

    analyse (param) {
      this.fa = []
      this.mode = param.type || ''
      param.data.forEach(item => {
        item.records.forEach(equip => {
          if (equip.ruleType === 'beng') {
            this.beng = equip
          } else if (equip.ruleType === 'swj') { // swj对应施肥阀
            this.sfa = equip
          } else if (equip.ruleType === 'zha') { // zha对应电磁阀
            this.fa.push(equip)
          }
        })
      })
    }

    getData (orgId) {
      return $.ajax({
        url: host + 'propertyRule/listmachine',
        // url: '../assets/listmachine.json',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          'orgId': orgId
        }),
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      })
    }

    opera (opts) {
      return $.ajax({
        url: host + 'propertyRule/opera',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: encode64(JSON.stringify(opts)),
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      })
    }

    isOperaSuccess (ruleId, sId) {
      return $.ajax({
        type: "POST",
        url: host + "propertyRule/checkCmd",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          "ruleId": ruleId,
          "sId": sId
        }),
        timeout: 10000,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        dataFilter: function (data) {
          var dat = JSON.parse(data);
          return JSON.stringify(dat.param.endCmd);
        }
      });
    }

    setMode (opts) {
      return $.ajax({
        url: host + 'propertyRule/operaType',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: encode64(JSON.stringify(opts)),
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      })
    }

    render () {
      let data = {
        mode: this.mode,
        beng: this.beng,
        sfa: this.sfa,
        fa: this.fa
      }

      let html = template('tpl-animation', data)
      document.getElementById('app-animation').innerHTML = html
    }
  }

  return Pty
})