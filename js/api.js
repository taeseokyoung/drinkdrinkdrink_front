//develop ?
// const backend_adress = "http://127.0.0.1:8000";
// const frontend_adress = "http://127.0.0.1:5500";

//distribution?
const backend_adress = "https://backend.drinkdrinkdrink.xyz";
const frontend_adress = "https://backend.https://drinkdrinkdrink.xyz";

// 홈 이동
function moveHome() {
  window.location.replace(`${frontend_adress}/`);
}

// 마이페이지 이동
function moveProfile() {
  window.loaction.replace(`${frontend_adress}/doc/signin.html`);
}

// 로그인 이동
function moveSignIn() {
  window.location.replace(`${frontend_adress}/doc/signin.html`);
}

// 회원가입 이동
function moveSignUp() {
  window.location.replace(`${frontend_adress}/doc/signup.html`);
}

async function getArticles() {
  const response = await fetch(`${backend_adress}/`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("불러오기 실패!");
  }
}
