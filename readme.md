复旦大学2024年度第一学期 走近人工智能 课程presentation展示网页

由于不同浏览器和不同设备的安全防护情况不同，可能存在api转发失败的情况，这种时候可能需要在本地运行一个CORS代理服务器，方法如下

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
