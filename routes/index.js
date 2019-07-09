//编辑模块
const express = require('express');
const router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: '模板' });
});

module.exports = router;
