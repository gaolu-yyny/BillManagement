require('dotenv').config({path:'../../.env'});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('成功连接到 MySQL');
  }
});

module.exports = db;
