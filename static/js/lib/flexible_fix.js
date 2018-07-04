(function (win) {
  // html根元素
  var HTML_ELEMENT = document.documentElement;
  // 屏幕宽度
  var SCREEN_WIDTH = 0;
  // 标准fontSize计算值
  var BASE_FONT_SIZE = 0;
  // 处理后的fontSize计算值
  var REAL_BASE_FONT_SIZE = 0;

  /**
  * 修复异常的fontSize代码
  */
  var fix = function () {
      var ua = navigator.userAgent;
      // var isAndroid = /(Android)/.test(ua);
      var isIOS = /(iPhone|iPad|iPod)/.test(ua);
      // 非苹果设备，均进行检测
      if (!isIOS) {
        // alert('android');
          var div = win.document.createElement('div');
          div.style.width = '10rem';
          win.setTimeout(function () {
              win.document.body.appendChild(div);
              var getWidth = parseFloat(win.getComputedStyle(div).width);
              if (getWidth > SCREEN_WIDTH) {
                  // 此时是出问题的情况
                  var ratio = getWidth / SCREEN_WIDTH;
                  REAL_BASE_FONT_SIZE = (BASE_FONT_SIZE / ratio).toFixed(4);
                  HTML_ELEMENT.style.fontSize = REAL_BASE_FONT_SIZE + 'px';
              }
              div.remove();
          }, 1000);
      }
  };

  /**
   * 调整根元素fontSize
   */
  var setBaseFontSize = function () {
      // 获取屏幕宽度
      SCREEN_WIDTH = HTML_ELEMENT.clientWidth;
      // 将屏幕分成10份，获取每一份宽度
      BASE_FONT_SIZE = SCREEN_WIDTH / 10;
      // 写入html元素fontSize
      HTML_ELEMENT.style.fontSize = BASE_FONT_SIZE + 'px';
      fix();
  };

  /**
   *手机旋转控制
   */
  var tid;
  if (win.onorientationchange) {
      win.onorientationchange = function () {
          clearTimeout(tid);
          tid = setTimeout(function () {
              setBaseFontSize();
          }, 300);
      }
  } else {
      win.onresize = function () {
          clearTimeout(tid);
          tid = setTimeout(function () {
              setBaseFontSize();
          }, 300);
      };
  }
  setBaseFontSize();
})(window);