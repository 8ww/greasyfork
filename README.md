这个函数用于检查 Greasyfork 上的脚本版本，并提示用户更新

### 代码说明：

1. 头部元数据

   - @name：脚本名称，设为“检查更新”。
   - @version：版本号，这里设为 1.0。
   - @description：描述脚本功能。
   - @match：匹配的域名，与原脚本一致。
   - @grant：需要的权限，包括 GM_xmlhttpRequest 和 GM_info。
   - @license：使用 MIT 许可证。
   - @run-at：脚本在页面加载完成时运行。

2. 核心功能

   - getUpdate 函数通过 GM_xmlhttpRequest 请求 Greasyfork 脚本页面，解析 HTML 获取最新版本号。
   - 使用 GM_info.script.version 获取当前脚本的版本号。
   - 通过 XPath (//*[@id="script-stats"]/dd[5]/span) 定位最新版本号。
   - 如果检测到新版本，弹出确认框提示用户更新，确认后跳转到脚本主页。

3. 错误处理

   添加了 onerror 回调，打印错误信息到控制台。

4. 立即执行

   使用 IIFE（立即执行函数表达式）包裹代码，并在最后调用 getUpdate() 以启动检查。

### 使用方法：

- 将此代码保存为 .user.js 文件（例如 check-update.user.js）。
- 在支持用户脚本的浏览器插件（如 Tampermonkey）中安装。
- 确保脚本运行环境支持 GM_xmlhttpRequest 和 GM_info。

### 注意事项：

- 脚本假设目标页面需要根据实际修改：格式应该为 https://greasyfork.org/zh-CN/scripts/·····，如果需要检查其他脚本的更新，请修改 scriptHomepage。
- XPath 路径可能因 Greasyfork 页面结构变化而失效，需定期检查和更新。

