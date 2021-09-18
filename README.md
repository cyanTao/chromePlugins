# webpack for chrome plugins (webpack 打包成谷歌插件)

###### 谷歌插件开发文档 (https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## 目录结构

```bash
├─dist                                 # 项目静态资源打包目录,谷歌插件运行目录
├─build                                # webpack打包配置
├─template                             # 模板文件目录,其内容除了html文件都会被复制到dist打包目录
├─src                                  # 源代码目录
   |─config                            # 配置文件
      |_index.ts                       # 入口文件
      |_key.ts                         # 存放key字段的文件
   |─background                        # 并运行在浏览器背景页background.js文件
      |_index.ts                       # 入口文件
      |_hot-reload.js                  # 协助开发的热更新文件，检测到文件修改会自动刷新popup.html和content.js所在的页面
      |_action.ts                      # 处理来自浏览器的事件
      |_onMessage.ts                   # 监听来自浏览器的消息
   |─content                           # 插入并运行在浏览器的content_scripts文件
      |_index.ts                       # 打包后生成的content.js(插入浏览器的js脚本文件)
      |_index.less                     # 打包后生成的content.css(插入浏览器的css样式文件)
   |─popup                             # 谷歌插件运行的─popup文件
   |─types                             # ts类型文件
   |─utils                             # 工具目录
├─tsconfig.json                        # typescript配置文件
├─.eslintrc.js                         # eslint配置文件
├─.eslintignore                        # eslint忽略文件
├─package.json                         # 项目说明
├─README.md                            # REAME 文档
```

## 开发流程

yarn install or npm i 安装 node_modules 包

### 本地开发

npm start

### 打包

npm run build

## 谷歌插件简单介绍

### manifest.json

```
{
  "manifest_version": 2, // 版本

  "name": "Super Jenkins",  // 插件名称
  "description": "This extension allows the user to change the background color of the current page.",
  "version": "1.0",

  "browser_action": {
    "default_icon": "./logo.png", // 默认图标
    "default_popup": "./popup.html" // 插件展示的页面
  },
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
  "content_scripts": [
    {
      "matches": ["https://www.baidu.com/*", "http://127.0.0.1:5500/*"],  // 插入浏览器的脚本匹配的域名
      "js": ["libs/jquery.min.js", "js/content.js"], // 插入浏览器的js文件
      "css": ["css/content.css"], // 插入浏览器的css文件
      "run_at": "document_idle" // 插入的时机
    }
  ],
  "web_accessible_resources": ["fonts/*"],
  "background": { "scripts": ["hot-reload.js"] },
  "permissions": [
    "activeTab",
    "storage",
    "history",
    "contextMenus",
    "downloads"
  ]  // 授权api, 要用到chrome的api必须添加才能使用
}

```

### 谷歌插件通信概览


| --     | injected-script | content-script | popup-js | background-js |
| ------ | --------------- | -------------- | -------- | ------------- |
| injected-script | 无 | window.postMessage | 无 | 无
content-script | window.postMessage | - | chrome.runtime.sendMessage chrome.runtime.connect | chrome.runtime.sendMessage chrome.runtime.connect
popup-js | - | chrome.tabs.sendMessage chrome.tabs.connect | - | chrome.extension. getBackgroundPage()
background-js | - | chrome.tabs.sendMessage | chrome.tabs.connect chrome.extension.getViews | -
devtools-js | chrome.devtools. inspectedWindow.eval | - | chrome.runtime.sendMessage | chrome.runtime.sendMessage |

```
注：-表示不存在或者无意义，或者待验证。
```