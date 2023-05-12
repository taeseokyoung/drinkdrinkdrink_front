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

// function selectStar(){
//     const viewStars = document.getElementById("stars");
//     const stars = viewStars.option[viewStars.selectedIndex].value;

// }

async function handlePost(){
    const title = document.getElementById("title");
    const comment = document.getElementById("comment");
    const image = document.getElementById("image");
    const viewStars = document.getElementById("stars");
    const stars = viewStars.options[viewStars.selectedIndex].value;

    
    if (title.value && comment.value){
        const response = await fetch('http://127.0.0.1:8000/write/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "title":title.value,
            "comment":comment.value,
            // "image":image.value,
            "starts":stars
        })
            
        })
        console.log(title.value, comment.value, stars) 
        //
        title.value = ""
        comment.value = ""
    } else {
        console.log("내용이 없습니다")
        alert("값을 입력하세요")
    }

    
}




