const user_num = payload_parse.user_id

window.onload = async function () {
    // user
    const response = await fetch(`${backend_base_url}/users/profile/${user_num}/`)
    response_json = await response.json()
    console.log(response_json)

    const identify = document.getElementById("identify")
    const nickname = document.getElementById("nickname")
    const profile_img = response_json['profile_img']
    const fav_alcohol = document.getElementById("fav_alcohol")
    const amo_alcohol = document.getElementById("amo_alcohol")
    // const password = document.getElementById("password")

    identify.innerText = response_json['identify']
    nickname.innerText = response_json['nickname']


    // 이미지에는 기본적으로 / 가 있다.
    // console.log(response_json['profile_img']) / media / kyoungdaniels_77fvU8c.jpg


    const my_profile_img = document.getElementById("profile_img")

    if (!profile_img) {
        const profile = document.createElement("img")
        profile.setAttribute("src", `${no_image}`)
        my_profile_img.append(profile)

    } else {
        const profile = document.createElement("img")
        profile.setAttribute("src", `${backend_base_url}${users.image}`)
        my_profile_img.append(profile)
    }

    fav_alcohol.innerText = response_json['fav_alcohol']
    amo_alcohol.innerText = response_json['amo_alcohol']

    let articles = response_json['my_articles']
    console.log(articles)
    console.log(articles.image)

    const my_article_card = document.getElementById("my_articles")

    articles.forEach(article => {

        if (article) {

            const card = document.createElement("div")
            card.setAttribute("id", "article_card")

            const title = document.createElement("p")
            title.setAttribute("class", "title")
            title.textContent = article.title

            const content = document.createElement("p")
            content.setAttribute("class", "content")
            content.textContent = article.content

            const image = document.createElement("img")
            // image.setAttribute("img", "image")
            image.setAttribute("src", `${backend_base_url}${article.image}`)
            // image.setAttribute("onclick", "image")

            image.textContent = article.image
            console.log(articles.image)
            card.append(image, title, content)
            my_article_card.append(card)

        }
    })
}