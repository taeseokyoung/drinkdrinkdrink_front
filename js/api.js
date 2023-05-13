const backend_adress = "http://127.0.0.1:8000";
const frontend_adress = "http://127.0.0.1:5500";
const no_image =
  "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png";

// 홈 이동
function moveHome() {
  window.location.replace(`${frontend_adress}/`);
}

// 마이페이지 이동
function moveProfile() {
  window.loaction.replace(`${frontend_adress}/doc/profile.html`);
}

// 글 작성 페이지 이동
function movePost() {
  window.loaction.replace(`${frontend_adress}/doc/post.html`);
}

// 로그인 이동
function moveSignIn() {
  window.location.replace(`${frontend_adress}/doc/signin.html`);
}

// 회원가입 이동
function moveSignUp() {
  window.location.replace(`${frontend_adress}/doc/signup.html`);
}


// 로딩 시 홈에서 아티클 가져오기
async function getArticles() {
  const response = await fetch(`${backend_adress}/`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("불러오기 실패!");
  }
}

// 버튼 눌렀을 시 정렬
async function handleArticles(e) {
  let btn_id = e.id;
  let tag = "/";

  if (btn_id == "follow-btn") {
    tag = "/?order=follow";
  } else if (btn_id == "likes-btn") {
    tag = "/?order=likes";
  }

  const response = await fetch(`${backend_adress}${tag}`);
  const response_json = await response.json();

  console.log(response_json);

  const contentBox = document.getElementById("content-box");
  const images = document.getElementsByClassName("img-box");

  for (let i = images.length - 1; i >= 0; i--) {
    images[i].remove();
  }

  response_json.forEach((article) => {
    const imageBox = document.createElement("img");
    imageBox.setAttribute("class", "img-box");
    imageBox.setAttribute("onclick", "moveDetail()");

    if (article.image) {
      imageBox.setAttribute("src", `${backend_adress}${article.image}`);
    } else {
      imageBox.setAttribute("src", `${no_image}`);
    }
    contentBox.append(imageBox);
  });
}
