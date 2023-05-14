const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article_id");
let token = localStorage.getItem("access");

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
  console.log(comments);

  // 내용 가져오기
  document.getElementById("detail-title").innerText = article.title;
  document.getElementById("detail-user").innerText = article.user;
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
    commentUser.innerText = comment.user;
    const commentContent = document.createElement("div");
    commentContent.setAttribute("id", `comment-content-${comment.id}`);
    commentContent.innerText = comment.content;
    commentsBox.append(commentBox);
    commentBox.append(commentUser);
    commentBox.append(commentContent);
    if (comment.user == payload_parse.user_id) {
      const editBtn = document.createElement("button");
      editBtn.setAttribute("onclick", `commentDelete(${comment.id})`);
      editBtn.innerText = "삭제";
      commentBox.append(editBtn);
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
  // const commentBox
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

// // 코멘트 등록
// async function postComment(articleId, newComment) {
//   const response = await fetch(`${articleId}/comments/`, {
//     method: "POST",
//     headers: {
//       "content=type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       content: newComment,
//     }),
//   });
//   if (response.status == 200) {
//     response_json = await response.json();
//     return response_json;
//   } else {
//     alert(response.status);
//   }
// }
// function handleDelete(e) {
//   const singleItem = document.getElementById(e.id).parentElement;
//   singleItem.remove();
// }

// // 코멘트 로드
// async function loadComments(articleId) {
//   const response = await getComments(articleId);
//   const commentList = document.getElementById("comment-list");
//   commentList.innerHTML = "";
//   response.forEach((comment) => {
//     commentList.innerHTML += ``;
//   });
// }

// //코멘트 제출
// async function submitComment(articleId, newComment) {
//   const commentElement = document.getElementById("new-comment");
//   const newComment = commentElement.value;
//   const response = await postComment(articleId, newComment);
//   commentElement.value = "";
//   loadComments(articleId);
// }
// // 수정버튼
// function handleUpdate(e) {
//   const singleItem = document.getElementById(e.id).previousSibling;
//   singleItem.style.visibility = "hidden";
//   const updateInput = document.createElement("input");
//   updateInput.setAttribute("id", "update-input");
//   updateInput.value = singleItem.innerHTML;

//   singleItem.parentNode.insertBefore(updateInput, singleItem);
//   const updateButton = document.getElementById(e.id);
//   updateButton.setAttribute("onclick", "handleUpdateConfirm(this)");
// }
// //제출버튼만들기
// function handleUpdateConfirm(e) {
//   const updateInput = document.getElementById("update-input");
//   const singleItem = document.getElementById(e.id).previousSibling;
//   singleItem.innerHTML = updateInput.value;
//   singleItem.style.visibility = "visible";
//   const updateButton = document.getElementById(e.id);

//   updateButton.setAttribute("onclick", "handleUpdate(this)");
//   updateInput.remove();
// }

// //댓글 등록하면 화면에 띄워지기
// function addItem() {
//   const itemInput = document.getElementById("item-input");
//   const content = itemInput.value;
//   if (content) {
//     const myList = document.getElementById("my-list");
//     let list_number = myList.getElementsByTagName("li").length + 1;
//     const newList = document.createElement("li");
//     newList.innerText = content;
//     newList.setAttribute("onclick", "handleSingleClick(this)");
//     newList.setAttribute("id", `${list_number}th-item`);
//     myList.append(newList);
//     itemInput.value = "";
//   } else {
//     alert("값을 입력하세요");
//   }
// }

// //삭제버튼 만들기
// const deleteButton = document.createElement("button");
// deleteButton.innerHTML = "삭제";
// deleteButton.setAttribute("onclick", "handleDelete(this)");
// deleteButton.setAttribute("id", `${list_number}th-item-delete-button`);
// newList.appendChild(deleteButton);

// window.onload = async function () {
//   await loadComments(articleId);
// };
