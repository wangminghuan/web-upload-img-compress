$(function(){
  $('#up-img').on('change', function () {
      // this.files[0] 是用户选择的文件
      var $this=$(this);
      // if (window.FileReader) {
      //       var reader = new FileReader();
      //       reader.readAsDataURL(this.files[0]);
      //       //监听文件读取结束后事件
      //       reader.onloadend = function (e) {
      //           console.log(e.target.result);
      //       };
      //   }
      console.log(this.files[0]);
      lrz(
        console.log(this.files[0]);, {
        width: 600,
        quality:0.5
      }).then(function (rst) {
        console.log(rst);
              // 把处理的好的图片给用户看看呗
              var _html="<p>压缩预览图：尺寸为</p>"
              $this.after("<img id='lrz-preview' src="+rst.base64+" />")
              return rst;
          }).then(function (rst) {
              $.ajax({
                url: 'http://koa-upload.coding.io', // 这个地址做了跨域处理，可以用于实际调试
                data: rst.formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                   console.log(JSON.stringify(data));
                }
              })
          }).catch(function (err) {
              // 万一出错了，这里可以捕捉到错误信息
              // 而且以上的then都不会执行
              alert(err);
          }).always(function () {
              // 不管是成功失败，这里都会执行
          });
  });
})
