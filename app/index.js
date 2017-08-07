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
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import copper from "./copper";
import showTips from "./showTips";
import FormDataShim from "./formDataShim";
window.$.fn.upLoadImgCutCompress = function(obj) {
  var def = {
    radio: 1/1,
    quality: 0.9,
    finalWidth: 200,
    isShowCut: true,
    postUrl: '',
    finalShowSelector: "",
    callback: function() {}
  }
  for (var key in obj) {
    if (typeof obj[key] !== "undefined") {
      def[key] = obj[key]
    }
  }
  if (def.postUrl == "") {
    showTips('postUrl不能为空！', false, 800);
    throw new Error('postUrl不能为空！');
    return false;
  }
  $(this).on('change', function() {
    var $this = $(this),
      randomId = "_compress_random_id_AvFxfPq";
    if (!$this.val().match(/.jpg|.gif|.png|.bmp/i)) {
      showTips('图片格式无效！', false, 800);
      return false;
    }
    if (!document.createElement('canvas').getContext) {
      throw new Error('浏览器不支持canvas');
      showTips('您的浏览器不支持canvas', false, 800);
      return false;
    }
    //callback参数对象
    var originArr = {},
      finalArr = {};
    showTips("读取成功，正在加载...");
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var image = new Image(),finalHeight=0;
      image.src = data;
      image.id = randomId;
      image.style.display = "none";
      image.onload = function() {
        console.log("原始图片信息：宽高：" + image.width + "×" + image.height + ",大小：" + (file.size / 1024).toFixed(2) + "KB")
        originArr = {
          width: image.width,
          height: image.height,
          size: file.size
        };
      //  var  finalHeight= def.isShowCut? parseInt(def.finalWidth / (def.radio)): parseInt(def.finalWidth / (image.width/image.height));
        if (def.isShowCut) {
          finalHeight = parseInt(def.finalWidth / (def.radio));
          //添加一个隐藏节点
          $this.after(image);
          showTips("加载完毕！", true);
          $("#" + randomId).cropper({
            aspectRatio: def.radio,
            viewMode: 1,
            rotatable: true,
            minContainerHeight: $(window).height(),
            ready: function() {
              $(".cropper-container").append("<div class='cropper-bottom-fn-btn'><em>裁剪图片</em><span class='cropper-btn-confirm'>确定</span><span class='cropper-btn-cancel'>取消</span></div>")
              $(".cropper-btn-cancel").click(cancelCropper)
              $(".cropper-btn-confirm").click(function(){confirmCropper(finalHeight)})
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
        } else {
          var _canvas = document.createElement('canvas');
          finalHeight = parseInt(def.finalWidth / (image.width/image.height));
          _canvas.width=def.finalWidth;
          _canvas.height=finalHeight;
          var ctx = _canvas.getContext('2d');
          ctx.clearRect(0, 0, def.finalWidth, finalHeight);
          ctx.drawImage(this, 0, 0, def.finalWidth, finalHeight);
          sendAjaxFormData(_canvas, finalHeight);
          showFinalImg($(def.finalShowSelector), _canvas);
          showTips("上传完毕！", true);
        }

      };
    };
    reader.readAsDataURL(file);
    //取消裁剪功能
    function cancelCropper() {
      $("#" + randomId).cropper('destroy');
      $("#" + randomId).remove();
    }
    //确定裁剪功能
    function confirmCropper(finalHeight) {
      var canvas = $("#" + randomId).cropper('getCroppedCanvas', {
        width: def.finalWidth,
        height: finalHeight,
        imageSmoothingQuality: "high"
      });
      showFinalImg($(def.finalShowSelector),canvas);
      $("#" + randomId).cropper('destroy');
      $("#" + randomId).remove();
      sendAjaxFormData(canvas,finalHeight);
    }
    //回传页面展示图片
    function showFinalImg($select,canvas){
    if ($select.length) {
      //最终放置预览图的节点是img则改变src属性，否则在目标点内部添加canvas结构
      $select[0].nodeName == "IMG"
        ? $select.attr("src", canvas.toDataURL('image/jpeg'))
        : $select.html(canvas)
    };
  }
    //发送数据
    function sendAjaxFormData(canvas,height) {
      var dataURL = canvas.toDataURL('image/jpeg', def.quality);
      var blob = dataURLtoBlob(dataURL);
      console.log("最终上传图片信息：宽高：" + def.finalWidth + "×" + height + ",大小：" + (blob.size / 1024).toFixed(2) + "KB")
      finalArr = {
        width: def.finalWidth,
        height: height,
        size: blob.size
      };
      //执行回调，图片压缩前后数据作为参数回传
      def.callback(originArr, finalArr);
      var fd = new FormDataShim();
      fd.append("uploadFile", blob, 'image.png');
      $.ajax({
        url: def.postUrl, method: 'POST', processData: false, // 必须
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
