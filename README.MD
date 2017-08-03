## webpack 构建项目说明

### 1 开始
安装依赖

	npm install

开启express服务（webpack-dev-server自带），手动访问http://localhost:3001

    npm run start

### 2 构建
运行

    npm run build

自动在build目录的bundle.js即为最终打包好的组件
### 3 使用方式

		$("#up-img").upLoadImgCompress({
			postUrl: "http://koa-upload.coding.io",//ajax提交地址
			width:320,//压缩图片宽度
			quality:0.3//压缩图片质量
		})

### 4 其他说明

1. 整个项目基于https://github.com/think2011/localResizeIMG 撰写，本项目只是将其作为jq插件进行封装
