# 复旦大学2024年度第一学期 走近人工智能 课程presentation展示网页

## 大模型服务失败解决方案
由于不同浏览器和不同设备的安全防护情况不同，可能存在api转发失败的情况。推荐在Edge或者Chrome的电脑端上打开网站，如果还是无法正常使用，可能需要在本地运行一个CORS代理服务器，方法如下

1. 将本项目clone到本地
2. 打开terminal，运行
```
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere
npm install
node server.js
```
3. 启动后，CORS代理将运行在 本机8080端口上，然后在js/script.js中将api请求地址修改为
```
const apiUrl = "http://localhost:8080/https://dashscope.aliyuncs.com/api/v1/apps/9b5b1d8a879c4f7881ac34ec38cc0071/completion";
```
4. 使用VSCode插件Live Server（或其他类似插件）运行本项目网页，即可正常使用大语言模型服务

## 项目说明
### 分工：
- 资料查找：卢羿舟 金唐丹 谢安琪 杜艺彤 王紫仪 张一泠 郭珈如
- 网站建设：卢羿舟 

本项目项目代码几乎完全由ChatGPT-4o和Cursor的Claude-3.5-sonnet API生成（除去填写内容的部分）。ChatGPT-4o实现整体设计和代码框架，以及技术问题回答；Cursor实现细节。

### ChatGPT提示词：

我是一个对前端几乎一无所知的人，我现在需要为我的课程作业准备一个网页，所以需要你为我提供尽可能完全的技术支持，我现在的文件夹中有一个index.html文件，一个assets文件夹，一个css文件夹，一个js文件夹，我需要你每次为我提供帮助的时候，都说明白我应该在哪个文件中的哪些地方添加什么内容，如果你的回答需要参考我现在某个文件中的所有内容，请向我提出需求，清楚了吗，如果你清楚并且记住了上面的内容，请你回复：清楚，我记住了
