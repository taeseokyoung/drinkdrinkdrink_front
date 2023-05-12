// 코멘트 등록
let articleId;
async function getComments(articleId) {
  const response = await fetch(`${articleId}/comments/`);
  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}
async function postComment(articleId, newComment) {
  let token = localStorage.getItem("access");
  const response = await fetch(`${articleId}/comments/`, {
    method: "POST",
    headers: {
      "content=type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: newComment,
    }),
  });
  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}
async function loadComments(articleId) {
  const response = await getComments(articleId);
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";
  response.forEach((comment) => {
    commentList.innerHTML += ``;
  });
}
async function submitComment(articleId, newComment) {
  const commentElement = document.getElementById("new-comment");
  const newComment = commentElement.value;
  const response = await postComment(articleId, newComment);
  commentElement.value = "";
  loadComments(articleId);
}
window.onload = async function () {
  await loadComments(articleId);
};
