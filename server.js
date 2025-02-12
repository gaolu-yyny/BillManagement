console.log("开始启动服务器...");

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const db = require('./src/db/');
const dotenv = require('dotenv');
dotenv.config(); // 这一步确保加载 .env 文件中的环境变量

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

console.log('数据库连接配置：', process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // 允许来自该地址的请求
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  credentials: true, // 如果你需要支持 cookies
}));


const PORT = process.env.PORT || 4000;

console.log("代码执行到这里");

app.post('/register', async (req, res) => {
    console.log('请求到达 /register 路由');
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('查询失败:', err);
            return res.status(500).json({ message: '注册失败' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('插入失败:', err);
                return res.status(500).json({ message: '注册失败' });
            }
            res.status(201).json({ message: '注册成功' });
        });
    });
});

// 添加登录路由
app.post('/login', async (req, res) => {
    console.log('请求到达 /login 路由');
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('查询失败:', err);
            return res.status(500).json({ message: '登录失败' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: '用户不存在' });
        }

        const match = await bcrypt.compare(password, results[0].password);
        if (!match) {
            return res.status(401).json({ message: '密码错误' });
        }

        return res.json({ success: true, message: '登录成功'});    });
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
