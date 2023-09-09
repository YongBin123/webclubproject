document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const userData = {
    fullname: fullname,
    phone: phone,
    email: email,
    username: username,
    password: password
  };

  // JSON.stringify를 사용하여 body를 JSON 문자열로 변환
  fetch('http://localhost:5500/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.message); // errorData.message를 사용하여 오류 메시지를 가져옴
      });
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    alert(data.success);
  })
  .catch(error => {
    console.error('클라이언트 오류:', error);
    alert('회원가입 실패: ' + error.message);
  });
});

function goBack() {
    window.open("trip.html");
    window.close();
}