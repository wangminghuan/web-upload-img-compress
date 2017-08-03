## gulp 构建项目说明

##  开始
安装依赖

	npm install

##  执行任务
###  开启本地web服务-监听build目录下文件
    gulp watch

浏览器自动跳转到http://localhost:8000。此任务为自动监听文件+自动构建+自动刷新，且css支持热更新注入，js则会强制刷新。同时会在根目录的index.html文件中注入(inject) build 后的文件路径(css和js)。

inject模式，支持覆盖和重新擦写，每次开启服务都会将模板文件中的占位部分更新一次。

###  开启本地web服务-监听src目录下文件
    gulp watch-src

浏览器自动跳转到http://localhost:8001。此任务与上个任务的区别在于只监听，不构建文件，因而不适用于模块化开发。所有src下的js，cs都会被inject到模板中

### 生成雪碧图

    npm sprite
会在`build/img`下生成最终合成的雪碧图和`sprite-style.css`文件，要合成的雪碧图碎片以及最终生成的css样式支持定制化开发，请在`gulp_task/sprite.js`中进行修改。缺点是：需要手动与自己代码做融合。优点是：该功能与项目并不耦合，图片和样式可随意使用。

### 压缩文件

    gulp build

首先会先运行运行一次js/css构建任务，然后压缩build目录下的js,cs文件，加上后缀`.min`（此时build下资源会有两份，一份未压缩，一份有min后缀，已压缩）。将`src/img`目录下的图片全部压缩输出到`build/src`下。

### 模拟后端数据
开启web服务时，启动即可，默认不启动。

**访问数据**
server目录下json文件即为相关的模拟数据。直接访问：

	http://localhost:3000/mock
即可得到数据（端口可配置，在`gulp_task/mock.js`下修改）

**启动路由**

通过`server/mock.router.js`进行分发，通过id访问对应数据

	http://localhost:8001/mock.router?id=123

也可以直接访问该文件（其实被解析为json文件）

	http://localhost:8001/mock.router
## 项目结构


```
.
├── src                      # 程序源文件
│   ├── lib                  # 第三方库
│   │     └── zepto.js
│   │
│   ├── static               # 静态资源文件
│   │     ├──── css          # 样式
│   │     │      ├── indexa.css
│   │     │      └── indexb.css
│   │     ├──── img          # 图片
│   │     │
│   │     │
│   │     └──── js           # js脚本
│   │            ├── mod.js
│   │            └── util    # 工具集
│   │                 └── util.js
│   │
│   └── index.js           	 # 入口js
│
│
├── build                    # 构建压缩后的文件目录
│   ├── css
│   ├── img
│   └── js
│
├── view                     # 模板文件
│   ├── pagea.html
│   └── pageb.html
│
├── gulp_task                # 静态资源文件
│   ├── build.js             # gulp任务配置-压缩任务
│   ├── sprit.js             # gulp任务配置-雪碧图任务配
│   ├── watch.js             # gulp任务配置-监听任务
│   └── watch.b.js           # gulp任务配置-监听任务B
│
├── server                   # 模拟后端接口数据
│      ├── mock.json
│      ├── mock-a.js
│      └── mock.router.js    # 模拟数据路由配置
│
├── config                   # 项目资源路径配置文件
│
├── gulpfile.js              # gulp配置文件
│
└── doc                      # 项目文档

```


## 其他

1. 模式A支持ES6语法和模块化开发，模块化打包是基于rollup构建的。

2. 模式A下每次保存都会构建一遍，然后再刷新，目前暂不知道在大型项目下构建速度如何，小型开发构建速度尚可接受。
