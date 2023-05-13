let token = localStorage.getItem("payload")
const payload_parse = JSON.parse(token);
const user_num = payload_parse.user_id

window.onload = async function () {
    // user
    const response = await fetch(`${backend_base_url}/users/profile/${user_num}/`)
    response_json = await response.json()
    // console.log(response_json)

    const user_id = document.getElementById("user_id")
    const nickname = document.getElementById("nickname")
    const profile_img = document.getElementById("profile_img")
    const fav_alcohol = document.getElementById("fav_alcohol")
    const amo_alcohol = document.getElementById("amo_alcohol")
    // const password = document.getElementById("password")

    user_id.innerText = response_json['user_id']
    nickname.innerText = response_json['nickname']


    // 이미지에는 기본적으로 / 가 있다.
    // console.log(response_json['profile_img']) / media / kyoungdaniels_77fvU8c.jpg
    // profile_img.setAttribute("src", `http://127.0.0.1:8000${response_json['profile_img']}`)
    fav_alcohol.innerText = response_json['fav_alcohol']
    amo_alcohol.innerText = response_json['amo_alcohol']



    // user_articl

    const articles = response_json['my_articles']
    console.log(articles)

    for (i = 0; i < articles.length; i++) {
        const card = docume.getElementById("article_card")
        const title = document.createElement("div")
        title.setAttribute("class", "title")
        const content = document.createElement("div")
        content.setAttribute("class", "content")
        const image = document.createElement("div")
        image.setAttribute("img", "image")
        image.setAttribute("onclick", "image")
        card.appendChild(title)
        card.appendChild(content)
        card.appendChild(image)

        articles[i]
    }

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

}



















// const follow = document.getElementById("follow")
// response_json['followers'].forEach(follow => {
//     const user_follow = document.createElement("p")
//     user_follow.innerText = follow['email']
//     following.appendChild(user_follow)
// })


