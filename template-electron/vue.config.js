const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
    transpileDependencies: [],  // 需要babel编译的依赖包名
    css: {
        sourceMap: true         // 开启css map
    },
    productionSourceMap: false, // 生产环境关闭map
    configureWebpack: {
        output: {
            crossOriginLoading: 'anonymous',
        },
        plugins: [
            new SriPlugin({
                hashFuncNames: ['sha256', 'sha384'],
                enabled: process.env.NODE_ENV === 'production'  // 生产环境开启子资源完整性（SRI）配置
            })
        ],
    },
    pluginOptions: {
        electronBuilder: {
            externals: ['serialport'],
            preload: 'src/preload.js',
            builderOptions: {
                "appId": "com.tower1229.example",
                "productName": "electron-vue-scaffold",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2021",//版权信息
                "directories": {
                    "buildResources": "build",
                },
                "win": {//win相关配置
                    "icon": "./build/icons/icon.ico",//图标
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                //"x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./build/icons/icon.ico",// 安装图标
                    "uninstallerIcon": "./build/icons/icon.ico",//卸载图标
                    "installerHeaderIcon": "./build/icons/icon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                }
            }
        }

    }
}