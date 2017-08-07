## 项目说明

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

### 4 demo示例
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
### 5 参数说明

1. isShowCut: 是否展示裁剪浮层，默认为true（展示）
2. quality: 压缩比率，取值范围为0-1
3. postUrl: 必填项，图片上传地址，如果为空, 组件将不执行
4. radio: 图片裁剪时的裁剪框的比例，isShowCut为true下有效。默认为1/1
5. finalWidth: 最终上传图片的尺寸，默认为200
6. finalShowSelector:".copper-btn",
7. callback:

		$(".copper-btn").click(function(){
			$("#up-img").trigger("click")
		})

### 4 其他说明

1. 整个项目基于https://github.com/think2011/localResizeIMG 撰写，本项目只是将其作为jq插件进行封装
