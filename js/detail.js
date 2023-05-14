const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article_id");

// 코멘트 가져오는 함수
async function getComments(articleId) {
  const response = await fetch(`${backend_base_url}/${articleId}/comments/`);
  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}

window.onload = async function () {
  // 게시글 받아오기
  const article = await getArticle(articleId);
  // 댓글 받아오기
  const comments = await getComments(articleId);

  // 내용 가져오기
  document.getElementById("detail-title").innerText = article.title;
  document.getElementById("detail-user").innerText = article.nickname;
  document.getElementById("detail-time").innerText = article.created_at.substr(
    0,
    10
  );
  document.getElementById("detail-content").innerText = article.content;

  const imageBox = document.createElement("img");
  imageBox.setAttribute("class", "img-box");

  // 이미지 가져오기
  if (article.image) {
    imageBox.setAttribute("src", `${backend_base_url}${article.image}`);
  } else {
    imageBox.setAttribute("src", `${no_image}`);
  }
  document.getElementById("detail-img").append(imageBox);

  // 별점 가져오기
  const myStars = {
    1: "⭐️",
    2: "⭐️⭐️",
    3: "⭐️⭐️⭐️",
    4: "⭐️⭐️⭐️⭐️",
    5: "⭐️⭐️⭐️⭐️⭐️",
  };
  document.getElementById("detail-stars").innerText = myStars[article.stars];

  // 좋아요 버튼
  document.getElementById(
    "likes-btn"
  ).innerText = `좋아요 ${article.likes.length}`;
  // 로그인 한 유저랑 글 작성 유저랑 같을 때
  if (payload_parse.user_id == article.user) {
    const editBtn = document.createElement("button");
    editBtn.setAttribute("id", "edit-btn");
    editBtn.setAttribute("onclick", `moveEdit(${articleId})`);
    editBtn.innerText = "편집";
    document.getElementById("edit-box").append(editBtn);
  }

  // 댓글 가져오기
  const commentsBox = document.getElementById("comment-box");

  comments.forEach((comment) => {
    const commentBox = document.createElement("div");
    commentBox.setAttribute("class", "comment-content-box");
    const commentUser = document.createElement("div");
    commentUser.setAttribute("class", "comment-user");
    commentUser.innerText = comment.nickname;
    const commentContent = document.createElement("div");
    commentContent.setAttribute("id", `comment-content-${comment.id}`);
    commentContent.innerText = comment.content;
    commentsBox.append(commentBox);
    commentBox.append(commentUser, commentContent);

    if (comment.user == payload_parse.user_id) {
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("onclick", `commentDelete(${comment.id})`);
      deleteBtn.innerText = "삭제";
      const editBtn = document.createElement("button");
      editBtn.setAttribute("onclick", `commentEdit(${comment.id})`);
      editBtn.setAttribute("id", `comment-edit-button-${comment.id}`);
      editBtn.innerText = "수정";

      commentBox.append(deleteBtn, editBtn);
    }
  });
};

// 좋아요 버튼
async function handleLike() {
  const response = await fetch(`${backend_base_url}/${articleId}/like/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 200) {
    alert("좋아요를 눌렀습니다!");
  } else if (response.status == 204) {
    alert("좋아요를 취소했습니다!");
  } else {
    alert("로그인을 해주세요!");
  }
  location.reload();
}

// 글 수정 페이지 이동
function moveEdit(article_id) {
  window.location.href = `${frontend_base_url}/doc/post.html?article_id=${article_id}`;
}

// 댓글 작성해서 제출
async function commentSubmit() {
  const content = document.getElementById("comment-write").value;
  const response = await fetch(`${backend_base_url}/${articleId}/comments/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  if (response.status == 200) {
    alert("댓글이 작성되었습니다!");
  } else {
    alert("댓글 작성에 실패했습니다.");
  }
  location.reload();
}

// 코멘트 삭제
async function commentDelete(comment_id) {
  const response = await fetch(
    `${backend_base_url}/${articleId}/comments/${comment_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status == 204) {
    alert("댓글이 삭제되었습니다!");
  } else {
    alert("댓글 삭제 권한이 없습니다.");
  }
  location.reload();
}

// 코멘트 수정
function commentEdit(comment_id) {
  const inText = document.getElementById(
    `comment-content-${comment_id}`
  ).innerText;

  // 인풋박스 만들어서 내용 넣어주기
  const commentBox = document.getElementById(
    `comment-content-${comment_id}`
  ).parentElement;

  const inputBox = document.createElement("textarea");
  inputBox.setAttribute("id", "comment-edit");
  inputBox.value = inText;

  commentBox.append(inputBox);

  const editBtn = document.getElementById(`comment-edit-button-${comment_id}`);
  editBtn.setAttribute("onclick", `commentEditSubmit(${comment_id})`);
}

// 코멘트 수정한거 제출
async function commentEditSubmit(comment_id) {
  const content = document.getElementById("comment-edit").value;
  const response = await fetch(
    `${backend_base_url}/${articleId}/comments/${comment_id}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    }
  );
  if (response.status == 200) {
    alert("댓글이 수정되었습니다!");
  } else {
    alert("댓글 수정에 실패했습니다.");
  }
  location.reload();
}
