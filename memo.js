
window.onload = () => {
    console.log('로딩완료')
    // const myList = document.getElementById('my_list')
    // const listItem = document.getElementsByClassName('list_item')

    // myList.classList.toggle('on')
    // myList.classList.toggle('on')
    // console.log(myList)
    // console.log(listItem)
}





// handleProfileEdit()






async function handleProfileUpdate() {
    const password = document.querySelector('.password').value
    const nickname = document.querySelector('.nickname').value
    const profile_img = document.querySelector('.profile_img').value
    // const fav_alcohol = document.querySelector('.fav_alcohol').value
    // const amo_alcohol = document.querySelector('.amo_alcohol').value

    // console.log(password, nickname, profile_img, fav_alcohol, amo_alcohol)

    const response = await fetch('http://127.0.0.1:8000/users/profile/7/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "password": password,
            "nickname": nickname,
            "profile_img": profile_img,
            // "fav_alcohol": fav_alcohol,
            // "amo_alcohol": amo_alcohol
        }),
    })

    console.log(response)
}




    // user_articl

    // const articles = response_json['my_articles']
    // console.log(articles)

    // for (i = 0; i < articles.length; i++) {
    //     const card = docume.getElementById("article_card")
    //     const title = document.createElement("div")
    //     title.setAttribute("class", "title")
    //     const content = document.createElement("div")
    //     content.setAttribute("class", "content")
    //     const image = document.createElement("div")
    //     image.setAttribute("img", "image")
    //     image.setAttribute("onclick", "image")
    //     card.appendChild(title)
    //     card.appendChild(content)
    //     card.appendChild(image)

        
    // }

    // articles.forEach((article) => {
    //     if (article) {
    //         const card = docume.getElementById("article_card")
    //         const title = document.createElement("div")
    //         title.setAttribute("class", "title")
    //         const content = document.createElement("div")
    //         content.setAttribute("class", "content")
    //         const image = document.createElement("div")
    //         image.setAttribute("img", "image")
    //         image.setAttribute("onclick", "image")
    //         card.appendChild(title)
    //         card.appendChild(content)
    //         card.appendChild(image)
    //     }
    // })


    // articles.forEach((article) => {
    //     const imageBox = document.createElement("img");
    //     imageBox.setAttribute("class", "img-box");
    //     imageBox.setAttribute("onclick", "moveDetail()");

    //     if (article.image) {
    //         imageBox.setAttribute("src", `${backend_adress}${article.image}`);
    //     } else {
    //         imageBox.setAttribute("src", `${no_image}`);
    //     }
    //     contentBox.append(imageBox);
    // });





    // const my_articles = document.getElementById("my_articles")


    // // my_articles.innerText = response_json['title']
    // // my_articles.innerText = response_json['content']
    // // my_articles.image.setAttribute("src", `http://127.0.0.1:8000${response_json['profile_img']}`)

    // my_articles.innerText = response_json['image']
    // const followers = document.getElementById("followers")
    // const like_articles = document.getElementById("like_articles")


    
// const follow = document.getElementById("follow")
// response_json['followers'].forEach(follow => {
//     const user_follow = document.createElement("p")
//     user_follow.innerText = follow['email']
//     following.appendChild(user_follow)
// })
