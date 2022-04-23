const express = require('express');
const router = express.Router();
const https = require('https');
const parseString = require('xml2js').parseString;

router.get('/', (req, res, next) => {
  const opt = {
    host: 'news.google.com',
    port: 443,
    path: '/rss?hl=ja&ie=UTF=8&oe=UTF-8&gl=JP&ceid=JP:ja'
  };
  https.get(opt, (res2) => {
    let body = '';
    res2.on('data', data => {
      body += data;
    });
    res2.on('end', () => {
      parseString(body.trim(), (err, result) => {
        console.log(result);
        const data = {
          title: 'Google News',
          content: result.rss.channel[0].item
        };
        res.render('hello', data);
      });
    });
  });
});

module.exports = router;
