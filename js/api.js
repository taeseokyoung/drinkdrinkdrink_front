const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";
const no_image = "https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png";

let token = localStorage.getItem("payload")
const payload_parse = JSON.parse(token);

async function handleLogin() {
  const identify = document.getElementById("identify").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${backend_base_url}/users/login/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      "identify" : identify,
      "password" : password,
    }),
  });
  return response;
}

async function handleMock() {
  const response = await fetch(`${backend_base_url}/users/mock/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  console.log(response);
}

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  location.reload();
}

async function handleProfile() {
  const nickname = document.getElementById("nickname").value;
  const profile_img = document.getElementById("profile_img").value;
  const fav_alcohol = document.getElementById("fav_alcohol").value;
  const amo_alcohol = document.getElementById("amo_alcohol").value;
  const password = document.getElementById("password").value;

  const response = await fetch(
    `${backend_base_url}/users/profile/${user_id}/`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "identify": identify,
        "password": password
      }),
    }
  );

  return response;
}

// 홈 이동
function moveHome() {
  window.location.replace(`${frontend_base_url}/`);
}

// 마이페이지 이동
function moveProfile() {
    console.log("눌려")
    window.location.replace(`${frontend_base_url}/doc/profile.html`);

}

// 아티클 detail 가져오기
async function getArticle(e) {
  const response = await fetch(`${backend_base_url}/${e}`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("불러오기 실패!");
  }
}

// 로딩 시 홈에서 아티클 가져오기
async function getArticles() {
  const response = await fetch(`${backend_base_url}/`);

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

  if (btn_id == "stars-btn") {
    tag = "/?order=stars";
  } else if (btn_id == "likes-btn") {
    tag = "/?order=likes";
  }

  const response = await fetch(`${backend_base_url}${tag}`);
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
      imageBox.setAttribute("src", `${backend_base_url}${article.image}`);
    } else {
      imageBox.setAttribute("src", `${no_image}`);
    }
    contentBox.append(imageBox);
  });
