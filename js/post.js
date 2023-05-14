const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article_id");

window.onload = async function () {
  if (articleId) {
    // 버튼이랑 타이틀 바꿔주기
    const submitBtn = document.getElementById("submit-button");
    submitBtn.setAttribute("onclick", "handlePostEdit()");
    submitBtn.innerText = "수정";
    const pageTitle = document.getElementById("page-title");
    pageTitle.innerText = "게시물 편집";

    const imageEditAlert = document.getElementById("img-edit-alert");
    imageEditAlert.innerText = "! 이미지 업로드 시 기존 이미지가 대체됩니다.";

    const article = await getArticle(articleId);

    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const stars = document.getElementById("stars");

    title.value = article.title;
    content.value = article.content;
    stars.value = article.stars;
  }
};

// 업로드 이미지 미리보기
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("preview").src = "";
  }
}

async function handlePost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];
  const stars = document.getElementById("stars").value;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("stars", stars);
  if (image) {
    formData.append("image", image);
  }

  //로컬 스토리지에 토큰을 저장하면 이걸사용
  if (title && content) {
    console.log(formData);
    const response = await fetch(`${backend_base_url}/write/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status == 200) {
      alert("게시글 작성완료");
      // console.log(title, stars)
      window.location.replace(`${frontend_base_url}`);
    } else {
      //작성한 내용이 백에 들어가지 않을경우
      //console.log(response.json())
      alert("작성이 취소되었습니다");
    }
  } else {
    //프론트에서 제목, 내용을 작성하지 않은 경우
    //console.log(response.json())
    alert("빈칸을 작성하세요");
  }
}

async function handlePostEdit() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];
  const stars = document.getElementById("stars").value;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("stars", stars);
  if (image) {
    formData.append("image", image);
  }

  //로컬 스토리지에 토큰을 저장하면 이걸사용
  if (title && content) {
    console.log(formData);
    const response = await fetch(`${backend_base_url}/${articleId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status == 200) {
      alert("게시글 수정 완료!");
      window.location.replace(
        `${frontend_base_url}/doc/detail.html?article_id=${articleId}`
      );
    } else {
      alert("작성이 취소되었습니다");
    }
  } else {
    alert("빈칸을 작성하세요");
  }
}
