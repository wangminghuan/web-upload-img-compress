// import "./common/css/reset.scss";
// import header from "./modules/header";
/******** 原理：
 input的type=files得到图片文件:
1. H5的FileReader接口读取文件数据，得到图片的base64数据
2. 将得到的base64添加到img标签的src中,并添加到DOM中;
3. 利用copper组件对img标签进行指定比例裁剪，再按照指定尺寸缩小图片，最终得到canvas对象;
4. 将canvas对象转化为base64数据
5. 用得到的最终base64数据创建Blob对象和formaData对象，提交给后端;
ps： File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件
*******/
import "./style.scss";
// import lrz from "lrz";
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import copper from "./copper";

// var file=null;
// $("#btn").click(function(){
//   lrz(file, {
//     width: parseInt($("#up-width").val())||320,
//     def.quality: 0.5
//   }).then(function(rst) {
//     $.ajax({
//       url: "http://koa-upload.coding.io", // 这个地址做了跨域处理，可以用于实际调试
//       data: rst.formData,
//       processData: false,
//       contentType: false,
//       type: 'POST',
//       success: function(data) {
//         console.log("send data success")
//       },
//       error: function() {
//         console.error("send data failed!!")
//       }
//     })
//     var image = new Image();
//     image.src = rst.base64;
//     image.onload = function() {
//       console.log("压缩后图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (rst.fileLen / 1024).toFixed(2) + "KB")
//       $("#after").append("<p>压缩后图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (rst.fileLen / 1024).toFixed(2) + "KB</p>");
//       $("#after").append(image);
//     }
//     // $this.after(image)
//   }).catch(function(err) {
//     // 万一出错了，这里可以捕捉到错误信息
//     // 而且以上的then都不会执行
//     alert(err);
//   }).always(function() {
//     //预留接口
//     alert("上传成功！")
//   });
// })
window.$.fn.upLoadImgCutCompress = function(obj){
  var def ={
    radio:1/1,
    quality:0.9,
    finaWidth:200,
    isShowCut:true,
    postUrl:'',
    finalShowSelector:""
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
  alert("正在加载！！！")
  var $this = $(this),
  randomId="_compress_random_id_AvFxfPq",
  finaHeight=parseInt(def.finaWidth/(def.radio));
  if (!$this.val().match(/.jpg|.gif|.png|.bmp/i)) {
    alert('图片格式无效！');
    return false;
  }
  if (!document.createElement('canvas').getContext) {
        throw new Error('浏览器不支持canvas');
        return false;
    }
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    var image = new Image();
    image.src = data;
    image.id = randomId;
    image.style.display = "none";
    image.onload = function() {
      console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
      if(def.isShowCut){
        $this.after(image);
        $("#"+randomId).cropper({
          aspectRatio: def.radio,
          viewMode:1,
          rotatable:true,
          minContainerHeight:$(window).height(),
          ready:function(){
            alert("加载完毕！！！")
            $(".cropper-container").append("<div class='cropper-bottom-fn-btn'><span class='cropper-btn-confirm'>确定</span><span class='cropper-btn-cancel'>取消</span></div>")
            $(".cropper-btn-cancel").click(cancelCropper)
            $(".cropper-btn-confirm").click(confirmCropper)
          },
          crop: function(e) {
            // Output the result data for cropping image.
            // console.log(e.x);
            // console.log(e.y);
            // console.log(e.width);
            // console.log(e.height);
            // console.log(e.rotate);
            // console.log(e.scaleX);
            // console.log(e.scaleY);
          }
        });
      }else{
      var _canvas = document.createElement('canvas'),
      ctx = _canvas.getContext('2d');
      ctx.clearRect(0, 0, def.finaWidth, finaHeight);
      ctx.drawImage(this, 0, 0, def.finaWidth, finaHeight);
      sendImgFormData(_canvas);
      alert("正在压缩上传");
      }

    };
  };
  reader.readAsDataURL(file);
  //取消裁剪功能
  function cancelCropper(){
    $("#"+randomId).cropper('destroy');
    $("#"+randomId).remove();
  }
  //确定裁剪功能
  function confirmCropper(){
    var canvas=$("#"+randomId).cropper('getCroppedCanvas',{
      width:def.finaWidth,
      height:finaHeight,
      imageSmoothingQuality:"high"
    });
      if(def.finalShowSelector){$(def.finalShowSelector).html(canvas)};
      $("#"+randomId).cropper('destroy');
      $("#"+randomId).remove();
      sendImgFormData(canvas);
  }
 //发送数据
 function sendImgFormData(canvas){
 var dataURL = canvas.toDataURL('image/jpeg', def.quality);
 var blob = dataURLtoBlob(dataURL);
 console.log("最终上传图片信息：宽高：" + def.finaWidth + "×" + finaHeight + ",大小：" + (blob.size / 1024).toFixed(2) + "KB")
 var fd = new FormData(document.forms[0]);
 fd.append("uploadFile", blob, 'image.png');
   $.ajax({
       url: def.postUrl,
       method: 'POST',
       processData: false, // 必须
       contentType: false, // 必须
       dataType: 'json',
       data: fd,
       success(data) {
           console.log(data);
       }
       });
 }
});
}
// window.$.fn.upLoadImgCompress = function(obj) {
//   var def = {
//     width: 375,
//     def.quality: 0.7,
//     postUrl: ""
//   }
//   for (var key in obj) {
//     if (obj[key]) {
//       def[key] = obj[key]
//     }
//   }
//   if (def.postUrl == "") {
//     console.warn("postUrl is empty!!!")
//     return false;
//   }
//   $(this).on('change', function() {
//     var $this = $(this);
//     if (!$this.val().match(/.jpg|.gif|.png|.bmp/i)) {
//       alert('图片格式无效！');
//       return false;
//     }
//     file = this.files[0];
//     console.log(file);
//     var reader = new FileReader();
//     reader.onload = function(e) {
//       var data = e.target.result;
//       //加载图片获取图片真实宽度和高度
//       var image = new Image();
//       image.src = data;
//       image.onload = function() {
//         console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
//         $("#before").append("<p>原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB</p>");
//         $("#before").append(image);
//       };
//     };
//     reader.readAsDataURL(file);
//
//   });
// }
