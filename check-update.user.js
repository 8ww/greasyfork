// ==UserScript==
// @name         检查更新
// @version      1.0
// @description  检查脚本是否有新版本并提示更新
// @author       xuexim
// @match        *://*.chaoxing.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 检查更新的函数
    function getUpdate() {
        var currentVersion = GM_info.script.version; // 获取当前脚本版本
        var scriptHomepage = 'https://greasyfork.org/zh-CN/scripts/····'; // 脚本主页地址

        GM_xmlhttpRequest({
            method: 'GET',
            url: scriptHomepage,
            onload: function(response) {
                var pageContent = response.responseText;
                var parser = new DOMParser();
                var doc = parser.parseFromString(pageContent, 'text/html');
                
                // 使用 XPath 获取最新版本号
                var latestVersionElement = doc.evaluate(
                    '//*[@id="script-stats"]/dd[5]/span', 
                    doc, 
                    null, 
                    XPathResult.FIRST_ORDERED_NODE_TYPE, 
                    null
                ).singleNodeValue;

                if (latestVersionElement) {
                    var latestVersion = latestVersionElement.textContent.trim();
                    if (latestVersion !== currentVersion) {
                        // 弹出确认框提示更新
                        if (confirm(
                            '\u3010\u7248\u672c\u66f4\u65b0\u3011\u53d1\u73b0\u65b0\u7248\u672c\uff0c\u662f\u5426\u5347\u7ea7?\r' +
                            '\u3010\u91cd\u8981\u3011\u8001\u7248\u672c\u5c06\u4f1a\u51fa\u73b0\u672a\u77e5\u95ee\u9898\u4e0e\u98ce\u9669\uff0c\u8bf7\u5c3d\u5feb\u66f4\u65b0\uff01'
                        )) {
                            window.location.href = scriptHomepage; // 跳转到脚本主页
                        }
                    }
                }
            },
            onerror: function() {
                console.log('检查更新失败');
            }
        });
    }

    // 执行检查更新
    getUpdate();
})();