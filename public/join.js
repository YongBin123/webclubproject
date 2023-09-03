document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.querySelector('form');
  
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 비밀번호 필드의 값을 지우고, 숨깁니다.
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';

    // 서버로 회원가입 요청 보내기
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password); // 이제 비밀번호는 안전하게 서버로 전송됩니다.

    fetch('/register', {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`서버 응답이 비정상적입니다. 상태 코드: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      try {
        const data = JSON.parse(text);
        if (data.success) {
          alert('회원가입이 성공적으로 완료되었습니다.');
          // 원하는 동작 (예: 로그인 페이지로 이동)
        } else {
          alert('회원가입에 실패했습니다.');
        }
      } catch (error) {
        console.error('서버 응답 JSON 파싱 오류:', error);
      }
    })
    .catch((error) => {
      console.error('회원가입 오류:', error);
    });
  });
});

function goBack() {
    window.open("trip.html");
    window.close();
}