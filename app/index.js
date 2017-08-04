// import "./common/css/reset.scss";
// import header from "./modules/header";
import "./style.scss";
import lrz from "lrz";
// import Hammer from "hammerjs";
import copper from "./copper";
// $("#up-img").upLoadImgCompress({
// 	postUrl: "http://koa-upload.coding.io",
// 	width:540,
// 	quality:0.3
// })

// $('#image').cropper({
//   aspectRatio: 16 / 9,
//   crop: function(e) {
//     // Output the result data for cropping image.
//     console.log(e.x);
//     console.log(e.y);
//     console.log(e.width);
//     console.log(e.height);
//     console.log(e.rotate);
//     console.log(e.scaleX);
//     console.log(e.scaleY);
//   }
// });
var file=null;
$("#btn").click(function(){
  lrz(file, {
    width: parseInt($("#up-width").val())||320,
    quality: 0.5
  }).then(function(rst) {
    $.ajax({
      url: "http://koa-upload.coding.io", // 这个地址做了跨域处理，可以用于实际调试
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
      $("#after").append("<p>压缩后图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (rst.fileLen / 1024).toFixed(2) + "KB</p>");
      $("#after").append(image);
    }
    // $this.after(image)
  }).catch(function(err) {
    // 万一出错了，这里可以捕捉到错误信息
    // 而且以上的then都不会执行
    alert(err);
  }).always(function() {
    //预留接口
    alert("上传成功！")
  });
})

$("#up-img").on('change', function() {
  var $this = $(this);
  if (!$this.val().match(/.jpg|.gif|.png|.bmp/i)) {
    alert('图片格式无效！');
    return false;
  }
  file = this.files[0];
  console.log(file);
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    //加载图片获取图片真实宽度和高度
    var image = new Image();
    image.src = data;
    image.id = "origin-img";
    image.onload = function() {
      console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
      $("#before").append("<p>原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB</p>");
      $("#before").append(image);
      $('#origin-img').cropper({
        aspectRatio: 1/1,
        crop: function(e) {
          // Output the result data for cropping image.
          console.log(e.x);
          console.log(e.y);
          console.log(e.width);
          console.log(e.height);
          console.log(e.rotate);
          console.log(e.scaleX);
          console.log(e.scaleY);
        }
      });
      $(".clear").click(function(){
        $('#origin-img').cropper('destroy')
      })
      $(".sure").click(function(){
        var canvas=$('#origin-img').cropper('getCroppedCanvas',{
          width:100,
          height:100,
          imageSmoothingQuality:"high"
        });
         $("#copper-result").html(canvas)
         $('#origin-img').cropper('destroy');

          var dataURL = canvas.toDataURL('image/jpeg', 0.5);
          var blob = dataURItoBlob(dataURL); // 上一步中的函数
          var fd = new FormData(document.forms[0]);
          fd.append("the_file", blob, 'image.png');
          $.ajax({
              url: 'http://koa-upload.coding.io',
              method: 'POST',
              processData: false, // 必须
              contentType: false, // 必须
              dataType: 'json',
              data: fd,
              success(data) {
                  console.log(data);
              }
              });
      })
    };
  };
  reader.readAsDataURL(file);

});
function dataURItoBlob(base64Data) {
var byteString;
if (base64Data.split(',')[0].indexOf('base64') >= 0)
byteString = atob(base64Data.split(',')[1]);
else
byteString = unescape(base64Data.split(',')[1]);
var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
var ia = new Uint8Array(byteString.length);
for (var i = 0; i < byteString.length; i++) {
ia[i] = byteString.charCodeAt(i);
}
return new Blob([ia], {type:mimeString});
}
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
    file = this.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      //加载图片获取图片真实宽度和高度
      var image = new Image();
      image.src = data;
      image.onload = function() {
        console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
        $("#before").append("<p>原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB</p>");
        $("#before").append(image);
      };
    };
    reader.readAsDataURL(file);

  });
}
