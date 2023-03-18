var norunFlag = false;
var message_Path = "./live2d/"
var urlpar = new URLSearchParams(window.location.search);
let num;
if (urlpar.get("modelName") == null) {
  num = 1;
} else {
  num = urlpar.get("modelName");
}
var modelPath = "../model/" + num + "/";

if (!norunFlag) {
  function initLive2d() {}
  $(document).ready(function () {
    var AIimgSrc = [message_Path + modelPath + "model.1024/texture_00.png"];
    var images = [];
    var imgLength = AIimgSrc.length;
    var loadingNum = 0;
    for (var i = 0; i < imgLength; i++) {
      images[i] = new Image();
      images[i].src = AIimgSrc[i];
      images[i].onload = function () {
        loadingNum++;
        if (loadingNum === imgLength) {
          setTimeout(function () {
            loadlive2d("live2d", message_Path + modelPath + "model.json"); 
          }, 1);
          images = null;
        }
      };
    }
  });
}
