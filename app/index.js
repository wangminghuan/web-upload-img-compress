// import "./common/css/reset.scss";
// import header from "./modules/header";
import lrz from "lrz";
window.$.fn.upLoadImgCompress = function(obj) {
  var def = {
    width: 375,
    quality: 0.7,
    postUrl: ""
  }
  for (var key in obj) {
    if (obj[key]) {
      def[key] = obj[key]
    }
  }
  if (def.postUrl == "") {
    console.warn("postUrl is empty!!!")
    return false;
  }
  $(this).on('change', function() {
    var $this = $(this);
    if (!$this.val().match(/.jpg|.gif|.png|.bmp/i)) {
      alert('图片格式无效！');
      return false;
    }
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      //加载图片获取图片真实宽度和高度
      var image = new Image();
      image.src = data;
      image.onload = function() {
        console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
      };
    };
    reader.readAsDataURL(file);
    lrz(file, {
      width: def.width,
      quality: def.quality
    }).then(function(rst) {
      $.ajax({
        url: def.postUrl, // 这个地址做了跨域处理，可以用于实际调试
        data: rst.formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data) {
          console.log("send data success")
        },
        error: function() {
          console.error("send data failed!!")
        }
      })
      var image = new Image();
      image.src = rst.base64;
      image.onload = function() {
        console.log("压缩后图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (rst.fileLen / 1024).toFixed(2) + "KB")
      }
      // $this.after(image)
    }).catch(function(err) {
      // 万一出错了，这里可以捕捉到错误信息
      // 而且以上的then都不会执行
      alert(err);
    }).always(function() {
      //预留接口
    });
  });
}
