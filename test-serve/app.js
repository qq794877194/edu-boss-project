const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// 托管了dist目录，当访问 / 的时候，默认会返回托管目录中的index.html
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}));
app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}));
app.listen(4000, () => {
  console.log('local proxy serve running at port 4000');
});
