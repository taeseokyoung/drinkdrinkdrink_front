const frontend_base_url = "http://127.0.0.1:5500/"
const backend_base_url = "http://127.0.0.1:8000/"
let token = localStorage.getItem("access")

window.onload = ()=>{
    console.log("로딩!")
}

// 업로드 이미지 미리보기
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('preview').src = "";
    }
  }



async function handlePost(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").files[0];
    const stars = document.getElementById("stars").value;
    const formData = new FormData();


    formData.append('title', title)
    formData.append('content', content)
    formData.append('stars', stars)
    if (image){
        formData.append('image', image)
    } 

    //로컬 스토리지에 토큰을 저장하면 이걸사용
    
    if (title&&content){
        console.log(formData)
        const response = await fetch(`${backend_base_url}/write/`, {
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${token}`
            },
            body: formData
        })

        if (response.status == 200) {
            alert("게시글 작성완료")
            // console.log(title, stars)
            window.location.replace(`${frontend_base_url}`)
            

        } else {
            //작성한 내용이 백에 들어가지 않을경우
            //console.log(response.json())
            alert("작성이 취소되었습니다")
        }


    } else {
        //프론트에서 제목, 내용을 작성하지 않은 경우
        //console.log(response.json())
        alert("빈칸을 작성하세요")
    }

    
}






