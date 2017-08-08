## 图片压缩裁剪上传项目说明

一个基于jq的图片裁剪压缩上传插件，适用于PC,M,app。

### 1 开始
安装依赖

	npm install

开启express服务（webpack-dev-server自带），手动访问http://localhost:3001

    npm run start

### 2 构建
运行

    npm run build

自动在build目录的bundle.js即为最终打包好的组件

### 3 使用说明
1. 组件依赖jq，使用前请务必确保页面已经引入jq库。
2. zepto因为部分api差别，暂不支持。
3. 组件通过$.fn的方式挂载在jq对象的原型链上

### 4 在线Demo
1. [完整功能](https://wangminghuan.github.io/upLoadImgCutCompress/index.html)
2. [无裁剪蒙层](https://wangminghuan.github.io/upLoadImgCutCompress/index2.html)

### 5 代码示例说明
html结构

			<input id="up-img" type="file" accept="image/png,image/jpeg,image/gif" />

js代码

		$("#up-img").upLoadImgCutCompress({
			radio:1/1,
			quality:0.9,
			finalWidth:100,
			isShowCut:true,
			postUrl:'http://koa-upload.coding.io',
			finalShowSelector:".copper-btn",
			callback:function(origin, final){
				console.log(origin,final);
			}
		})
### 6 参数说明

1. isShowCut: 是否展示裁剪浮层，默认为true（展示）
2. quality: 压缩比率，取值范围为0-1
3. postUrl: 必填项，图片上传地址，如果为空, 组件将不执行
4. radio: 图片裁剪时的裁剪框的比例，isShowCut为true下有效。默认为1/1
5. finalWidth: 最终上传图片的尺寸，isShowCut为false下默认为200；isShowCut为true下可以缺省，缺省时为裁剪大小。
6. finalShowSelector:最终展示上传图片的jq选择器。
7. callback:回调函数，可以接收到两个参数，参数1为原始图片信息，参数2为最终上传图片的信息，json格式。

### 7 其他说明

1. 如果需要点击页面其他结构触发input标签，可以通过jq的trigger方法触发，例如

		$("#btn-id").click(function(){
			$("#up-img").trigger("click")
		})
2. 前端压缩裁剪图片思路
	- input的type=files得到图片文件:
	- H5的FileReader接口读取文件数据，得到图片的base64数据
	- 将得到的base64添加到img标签的src中,并添加到DOM中;
	- 利用copper组件对img标签进行指定比例裁剪(canvas实现)，再按照指定尺寸输出canvas对象;
	- 将canvas对象转化为base64数据
	- 用得到的最终base64数据创建Blob对象和formaData对象，提交给后端;
	
3. File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件
### 8 参考资料
1. [copper-A simple jQuery image cropping plugin](https://github.com/fengyuanchen/cropper)
2. [localResizeIMG](https://github.com/think2011/localResizeIMG)