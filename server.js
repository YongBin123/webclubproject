const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mydatabase',
});

// CORS 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// JSON 파싱 미들웨어를 app.use 아래에 배치합니다.
app.use(bodyParser.json());

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL DB에 연결되었습니다.');
  }
});

// POST 요청 파싱을 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 요청 처리
app.post('/register', (req, res) => {
  try {
    const { fullname, phone, email, username, password } = req.body;

    // 데이터베이스에 회원 정보 삽입
    const query = `INSERT INTO users (fullname, phone, email, username, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [fullname, phone, email, username, password], (err, result) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        // 더 자세한 오류 메시지를 클라이언트로 전달
        res.status(500).json({ error: '회원가입 실패', message: '데이터베이스 오류 발생', errorDetails: err.message });
      } else {
        console.log('회원가입 성공');
        res.json({ success: '회원가입 성공' });
      }
    });
  } catch (error) {
    console.error('서버 오류:', error);
    // 더 자세한 오류 메시지를 클라이언트로 전달
    res.status(500).json({ error: '서버 오류', message: '서버 오류 발생', errorDetails: error.message });
  }
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
  try {
    const { fullname, password } = req.body;

    if (!fullname || !password) {
      // 아이디 또는 비밀번호가 누락된 경우
      console.log('로그인 실패: 아이디 또는 비밀번호 누락');
      res.status(400).json({ error: '로그인 실패', message: '아이디 또는 비밀번호가 누락되었습니다.' });
      return;
    }

    // 데이터베이스에서 회원 정보 확인
    const query = `SELECT * FROM users WHERE fullname = ? AND password = ?`;
    db.query(query, [fullname, password], (err, result) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        res.status(500).json({ error: '로그인 실패', message: '데이터베이스 오류 발생', errorDetails: err.message });
      } else if (result.length > 0) {
        console.log('로그인 성공');
        const user = result[0];
        res.json({ fullname: user.fullname });
      } else {
        console.log('로그인 실패: 일치하는 회원 정보 없음');
        res.status(400).json({ error: '로그인 실패', message: '일치하는 회원 정보가 없습니다. 아아디와 비밀번호를 다시 한 번 확인해주세요.' });
      }
    });
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({ error: '서버 오류', message: '서버 오류 발생', errorDetails: error.message });
  }
});

// 로그아웃 엔드포인트
app.post('/logout', (req, res) => {
  res.json({ message: '로그아웃되었습니다.' });
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});