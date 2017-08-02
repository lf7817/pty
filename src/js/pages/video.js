define(['jquery'], ($) => {
  let videoParam = {
    videoIp: '192.168.2.241',
    port: 80,
    username: 'admin',
    password: 'yx123456'
  }

  let g_iWndIndex = 0

  $(window).on('resize', calcVideoContainerWeight)

  function videoInit() {
    //检查插件是否安装过
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
      alert("您还未安装插件，请联系管理员或自行下载安装海康威视的浏览器插件WebComponents.exe,插件支持火狐与IE!");
      return;
    }
    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin("100%", "100%", {
      iWndowType: 2,
      cbSelWnd: function (xmlDoc) {
        g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
        var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
        showCBInfo(szInfo);
      },
      bDebugMode: true
    });
    WebVideoCtrl.I_InsertOBJECTPlugin("video-plugin");
    WebVideoCtrl.I_CheckPluginVersion(); //检查插件是否要更新// -1:需要更新 0:不需要更新 -2未安装
  }

  // 登录'
  function login (videoParam) {
    var szIP = videoParam.videoIp,
      szPort = videoParam.port,
      szUsername = videoParam.username,
      szPassword = videoParam.password;

    if ("" == szIP || "" == szPort) {
      return;
    }

    var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
      success: function (xmlDoc) {
        showCBInfo(szIP + " 登录成功！");
        setTimeout(function () {
          getChannelInfo(szIP);
        }, 10);
      },
      error: function () {
        showCBInfo(szIP + " 登录失败！");
      }
    });

    if (-1 == iRet) {
      showCBInfo(szIP + " 已登录过！");
    }
  }

  // 显示回调信息
  function showCBInfo (szInfo) {
    szInfo = new Date().toLocaleDateString() + "--" + szInfo
    console.log(szInfo);
  }

  // 获取通道
  function getChannelInfo (szIP) {
    var oSel = $("#channels").empty(), nAnalogChannel = 0;
    if ("" == szIP) {
      return;
    }
    // 模拟通道
    WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        var oChannels = $(xmlDoc).find("VideoInputChannel");
        nAnalogChannel = oChannels.length;

        $.each(oChannels, function (i) {
          var id = parseInt($(this).find("id").eq(0).text(), 10),
            name = $(this).find("name").eq(0).text();
          if ("" == name) {
            name = "Camera " + (id < 9 ? "0" + id : id);
          }
          oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
        });
        showCBInfo(szIP + " 获取模拟通道成功！");
      },
      error: function () {
        showCBInfo(szIP + " 获取模拟通道失败！");
      }
    });
    // 数字通道
    WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

        $.each(oChannels, function (i) {
          var id = parseInt($(this).find("id").eq(0).text(), 10),
            name = $(this).find("name").eq(0).text(),
            online = $(this).find("online").eq(0).text();
          if ("false" == online) {// 过滤禁用的数字通道
            return true;
          }
          if ("" == name) {
            name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
          }
          oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
        });
        showCBInfo(szIP + " 获取数字通道成功！");
      },
      error: function () {
        showCBInfo(szIP + " 获取数字通道失败！");
      }
    });
    // 零通道
    WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        var oChannels = $(xmlDoc).find("ZeroVideoChannel");

        $.each(oChannels, function (i) {
          var id = parseInt($(this).find("id").eq(0).text(), 10),
            name = $(this).find("name").eq(0).text();
          if ("" == name) {
            name = "Zero Channel " + (id < 9 ? "0" + id : id);
          }
          if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
            oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
          }
        });
        showCBInfo(szIP + " 获取零通道成功！");
      },
      error: function () {
        showCBInfo(szIP + " 获取零通道失败！");
      }
    });
  }

  // 退出登录
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
    showCBInfo(szIP + " " + szInfo);
  }

  // 开始预览
  function clickStartRealPlay(szIP) {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
      iStreamType = 1,
      iChannelID = parseInt($("#channels").val(), 10),
      bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
      szInfo = "";

    if ("" == szIP) {
      return;
    }

    if (oWndInfo != null) {// 已经在播放了，先停止
      WebVideoCtrl.I_Stop();
    }

    var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
      iStreamType: iStreamType,
      iChannelID: iChannelID,
      bZeroChannel: bZeroChannel
    });

    if (0 == iRet) {
      szInfo = "开始预览成功！";
    } else {
      szInfo = "开始预览失败！";
    }

    showCBInfo(szIP + " " + szInfo);
  }

  // 停止预览
  function clickStopRealPlay() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
      szInfo = "";

    if (oWndInfo != null) {
      var iRet = WebVideoCtrl.I_Stop();
      if (0 == iRet) {
        szInfo = "停止预览成功！";
      } else {
        szInfo = "停止预览失败！";
      }
      showCBInfo(oWndInfo.szIP + " " + szInfo);
    }
  }


// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
  var g_bPTZAuto = false;
  function mouseDownPTZControl(iPTZIndex) {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
      bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
      iPTZSpeed = $("#ptzspeed").val(),
      bStop = false;

    if (bZeroChannel) {// 零通道不支持云台
      return;
    }

    if (oWndInfo != null) {
      if (9 == iPTZIndex && g_bPTZAuto) {
        iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
        bStop = true;
      } else {
        g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
        bStop = false;
      }

      WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
        iPTZSpeed: iPTZSpeed,
        success: function (xmlDoc) {
          if (9 == iPTZIndex) {
            g_bPTZAuto = !g_bPTZAuto;
          }
          showCBInfo(oWndInfo.szIP + " 开启云台成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + " 开启云台失败！");
        }
      });
    }
  }

// 方向PTZ停止
  function mouseUpPTZControl() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(1, true, {
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 停止云台成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + " 停止云台失败！");
        }
      });
    }
  }

  function PTZZoomIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(10, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 调焦+成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  调焦+失败！");
        }
      });
    }
  }

  function PTZZoomout() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(11, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 调焦-成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  调焦-失败！");
        }
      });
    }
  }

  function PTZZoomStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(11, true, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 调焦停止成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  调焦停止失败！");
        }
      });
    }
  }

  function PTZFocusIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(12, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 聚焦+成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  聚焦+失败！");
        }
      });
    }
  }

  function PTZFoucusOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(13, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 聚焦-成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  聚焦-失败！");
        }
      });
    }
  }

  function PTZFoucusStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(12, true, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 聚焦停止成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  聚焦停止失败！");
        }
      });
    }
  }

  function PTZIrisIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(14, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 光圈+成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  光圈+失败！");
        }
      });
    }
  }

  function PTZIrisOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(15, false, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 光圈-成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  光圈-失败！");
        }
      });
    }
  }

  function PTZIrisStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
      WebVideoCtrl.I_PTZControl(14, true, {
        iWndIndex: g_iWndIndex,
        success: function (xmlDoc) {
          showCBInfo(oWndInfo.szIP + " 光圈停止成功！");
        },
        error: function () {
          showCBInfo(oWndInfo.szIP + "  光圈停止失败！");
        }
      });
    }
  }

  function calcVideoContainerWeight () {
    if (document.getElementById('video-plugin')) {
      let videoWidth = $('#video-plugin').height()
      $('#video-plugin').css('width', videoWidth * 16 / 11)
    }
  }

  return () => {
    // logout(videoParam.videoIp)
    calcVideoContainerWeight()
    videoInit()
    login(videoParam)

    $('#video-play').on('click', function () {
      clickStartRealPlay(videoParam.videoIp)
    })

    $('#video-stop').on('click', clickStopRealPlay)

    $('.yuntai button').on('mousedown', function () {
      if ($(this).attr('data-ptz')) {
        mouseDownPTZControl(parseInt($(this).attr('data-ptz')))
      }else if ($(this).attr('data-zoom')) {
        let str = $(this).attr('data-zoom')
        if (str === 'in') PTZZoomIn()
        else PTZZoomout()
      } else if ($(this).attr('data-focus')) {
        let str = $(this).attr('data-focus')
        if (str === 'in') PTZFocusIn()
        else PTZFoucusOut()
      } else if ($(this).attr('data-Iris')) {
        let str = $(this).attr('data-Iris')
        if (str === 'in') PTZIrisIn()
        else PTZIrisOut()
      }
    })
    $('.yuntai button').on('mouseup', function () {
      if ($(this).attr('data-ptz')) {
        mouseUpPTZControl()
      } else if ($(this).attr('data-zoom')) {
        PTZZoomStop()
      } else if ($(this).attr('data-focus')) {
        PTZFoucusStop()
      } else if ($(this).attr('data-Iris')) {
        PTZIrisStop()
      }
    })
  }
})