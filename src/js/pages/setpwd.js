/* eslint-disable no-undef */
define(['jquery', 'layer', 'module/Validator'], function ($, layer, Validator) {

  /**
   * 获取用户详情信息
   * @returns {*}
   */
  function getUserDetail () {
    return $.ajax({
      type: 'get',
      // async: false,
      url: host + 'user/detail',
      dataType: 'json',
      crossDomain: true,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      }
    })
  }

  function setPassWord (pwd, updateAt) {
    return $.ajax({
      url: host + 'user/update',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        updateAt: updateAt,
        passWord: pwd
      }),
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    })
  }

  function checkPwdInput () {
    let form = document.getElementById('form-pwd')
    let v = new Validator()
    v.add(form.password, [{
      strategy: 'isNonEmpty',
      errorMsg: '不能为空'
    }, {
      strategy: 'minLength:6',
      errorMsg: '密码长度能小于6'
    }])

    return v.start()
  }
  return function () {
    let updateAt = ''
    getUserDetail().done(data => {
      if (data.code === 0) {
        updateAt = data.param.updateAt
      }
    })

    $('#set-pwd').on('click', function () {
      $('#form-pwd input[name="password"]').attr('style', '')
      let checkResult = checkPwdInput()
      if (checkResult) { // 验证不通过
        checkResult.dom.style.border = "4px solid red"
        layer.msg(checkResult.errorMsg)
      } else { // 验证通过
        if ($('#pwd1').val() !== $('#pwd2').val()) {
          layer.msg('两次输入密码不一致')
        } else {
          setPassWord($('#pwd1').val(), updateAt).done(data => {
            layer.msg(data.msg)
          })
        }
      }
    })
  }
})
