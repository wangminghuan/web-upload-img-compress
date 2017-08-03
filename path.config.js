var path=require('path');
//定义了一些文件夹的路径
var __path={
	ENTRY: path.resolve(__dirname, 'app/index.js'),
	APP: path.resolve(__dirname, 'app/'),
	COMPONENT : path.resolve(__dirname, 'app/'),
	BUILD : path.resolve(__dirname, 'build/'),
	OUTPUT_NAME:"bundle.js",
	PUBLIC:"/"
}

module.exports=__path;
