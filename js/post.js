window.onload = ()=>{
    console.log("로딩!")
}

async function handlePost(){
    const title = document.getElementById("title")
    const comment = document.getElementById("comment")
    
    if (title.value && comment.value){
        const response = await fetch('http://127.0.0.1:8000/write/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "title":title.value,
            "comment":comment.value
        })
            
        })
        console.log(title.value, comment.value)
        title.value = ""
        comment.value = ""
    } else {
        console.log("내용이 없습니다")
        alert("값을 입력하세요")
    }

    
}
