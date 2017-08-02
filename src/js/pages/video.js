define(['jquery', 'WebVideoCtrl'], ($, WebVideoCtrl) => {
  let videoIp = [{
    videoIp: '192.168.2.101',
    videoName: '1号大棚'
  }]

  $(window).on('resize', calcVideoContainerWeight)

  function videoInit() {
    //检查插件是否安装过
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
      alert("您还未安装插件，请联系管理员或自行下载安装海康威视的浏览器插件WebComponents.exe,插件支持火狐与IE!");
      return;
    }
    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin("100%", "100%", {
      iWndowType: 1,
      cbSelWnd: function (xmlDoc) {
        console.log(xmlDoc);
        g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();

      },
      bDebugMode: true
    });
    WebVideoCtrl.I_InsertOBJECTPlugin("video-plugin");
    WebVideoCtrl.I_CheckPluginVersion(); //检查插件是否要更新// -1:需要更新 0:不需要更新 -2未安装
    //窗口分割数
    WebVideoCtrl.I_ChangeWndNum(parseInt(1));
  }

  function calcVideoContainerWeight () {
    if (document.getElementById('video-plugin')) {
      let videoWidth = $('#video-plugin').height()
      $('#video-plugin').css('width', videoWidth * 16 / 9)
    }
  }

  return () => {
    calcVideoContainerWeight()
    videoInit()
  }
})