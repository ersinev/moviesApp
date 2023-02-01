const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/whois', createProxyMiddleware({ target: 'https://api.myip.com', changeOrigin: true }));
app.listen(3001);