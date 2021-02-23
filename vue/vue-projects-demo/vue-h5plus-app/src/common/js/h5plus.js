let h5plus = {};
export default h5plus.install = function (Vue) {
  console.log("安装插件H5plus");
  let w = window;
  // 当前webview窗口
  let ws = null;

  function shield() {
    return false;
  }
  document.oncontextmenu = shield; //屏蔽选择函数
  document.addEventListener("touchstart", shield, false);

  function back(hide) {
    if (window.plus) {
      ws || (ws = window.plus.webview.currentWebview());
      hide || ws.preate ? ws.hide("auto") : ws.close("auto");
    } else if (history.length > 1) {
      history.back();
    } else {
      window.close();
    }
  }

  function plusReady() {
    Vue.prototype.$plus = plus;
    ws = plus.webview.currentWebview();
    plus.key.addEventListener(
      "backbutton",
      function () {
        back();
      },
      false
    );
  }
  if (window.plus) {
    plusReady();
  } else {
    document.addEventListener("plusready", plusReady, false);
  }
};