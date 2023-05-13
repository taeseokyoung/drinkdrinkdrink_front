function moveDetail() {
  window.location.href = `${frontend_adress}/doc/detail.html`;
}

window.onload = async function () {
  articles = await getArticles();
  console.log(articles);

  const contentBox = document.getElementById("content-box");

  articles.forEach((article) => {
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

  const buttonBox = document.getElementById("button-box");
  const profileBox = document.getElementById("profile-box");
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);

  if (payload_parse) {
    const myPageButton = document.createElement("button");
    myPageButton.setAttribute("onclick", "moveMyPage()");
    myPageButton.innerText = "마이 페이지";
    buttonBox.append(myPageButton);

    const myWriteButton = document.createElement("button");
    myWriteButton.setAttribute("onclick", "movePost()");
    profileBox.append(myWriteButton);
  } else {
    const mySigninButton = document.createElement("button");
    mySigninButton.setAttribute("onclick", "moveSignIn()");
    mySigninButton.innerText = "로그인";
    const mySignUpButton = document.createElement("button");
    mySignUpButton.setAttribute("onclick", "moveSignUp()");
    mySignUpButton.innerText = "회원가입";
    buttonBox.append(mySigninButton);
    buttonBox.append(mySignUpButton);
  }
};
