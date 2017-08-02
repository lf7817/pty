define(['router/routes', 'director', 'jquery', 'module/timer'], function (Routes, Router, $, timer) {
  let router = Router(Routes)
  router.configure({
    before () {
      clearDom()
      logout('192.168.2.241')
      timer.clear()
    }
  })

  function clearDom () {
    $('#router-view').children().remove()
  }

  function logout(szIP) {
    var szInfo = "";

    if (szIP == "") {
      return;
    }

    var iRet = WebVideoCtrl.I_Logout(szIP);
    if (0 == iRet) {
      szInfo = "退出成功！";
      // getChannelInfo(szIP);
    } else {
      szInfo = "退出失败！";
    }
    console.log(szIP + " " + szInfo);
  }

  return router
})
