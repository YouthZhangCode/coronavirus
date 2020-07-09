/**
 * @Summary: short description for the file
 * @Date: 2020/3/19 12:29 PM
 * @Author: Youth
 */

const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use('/g2',createProxyMiddleware(
    {
      "target": "https://view.inews.qq.com",
      "changeOrigin": true
    }));
  app.use('/news', createProxyMiddleware(
    {
      "target": "https://mat1.gtimg.com",
      "changeOrigin": true,
    }));
}