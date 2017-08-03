//项目路径设置
var path=require('path');
var __path={
	entry: path.resolve(__dirname,"app/index.js"),//入口js
	build: path.resolve(__dirname,"build"),//构建目录
	HTMLPath:path.resolve(__dirname,"view"),//html目录
	resoursePath:path.resolve(__dirname,"app/resourse/"),//所有资源目录
	JSPath:path.resolve(__dirname,"app/resourse/js"),//js目录
	CSSPath:path.resolve(__dirname,"app/resourse/css"),//css目录
	IMGPath:path.resolve(__dirname,"app/resourse/img"),//image目录
	publicPath:path.resolve(__dirname,"../publish")//发布资源目录，资源构建完成后的输出目录
};
module.exports=__path;
