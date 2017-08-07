var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//postcss-loader中autoprefixer插件
var autoprefixer = require('autoprefixer');
var __PATH = require('./path.config.js');
var config = {};

config.entry = [ //利用中间件实现热更新，reload=true配置如果热更新失败，强制刷新页面
  __PATH.ENTRY
];
//忽略下面模板，打包时无需打入
// config.externals={
//     'react': 'React',
//     'react-dom': 'ReactDOM'
// };
config.module = {
  loaders: [
    {
    test: /\.scss$/,
    include: __PATH.APP,
    exclude: /node_modules/,
    loader: "style-loader!css-loader?minimize!postcss-loader!sass-loader"
    // loader: ExtractTextPlugin.extract({
    //   //如果不需要单独提取css，注销此处配置，沿用上面配置
    //   fallback: "style-loader",
    //   use: ["css-loader?minimize", "postcss-loader", "sass-loader"]
    // })
  }
]
};
config.plugins = [

  //允许错误不打断程序
  new webpack.NoEmitOnErrorsPlugin(),
  //提取css 不需要注销即可
  // new ExtractTextPlugin("css/styles.css"),
  // 压缩js
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false, // remove all comments
    },
    compress: {
      warnings: false
    }
  }),
  // 补全前缀
  new webpack.LoaderOptionsPlugin({
    options: { // pass stuff to the loader
      postcss: [
        autoprefixer({ //全球使用统计 >1%
          browsers: ['last 2 versions', "> 1%", 'Android >= 4.0', "iOS 8"]
        })
      ]
    }
  })
];

module.exports = config;
