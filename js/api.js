const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"



window.onload = () => {
    const token = localStorage.getItem('payload');
    console.log('로딩 완료!')
    // const user_id = token[-2] undefiend
    const user_id = token.slice(-2, -1)
}




async function handleSignup() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    return response

}


async function handleLogin() {
    // console.log("눌러지고있다")
    const user_id = document.getElementById("user_id").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "user_id": user_id,
            "password": password
        })
    });
    return response
}


async function handleMock() {
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET",
    })

    console.log(response)
}


function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}


async function handleProfile() {
    const nickname = document.getElementById("nickname").value
    const profile_img = document.getElementById("profile_img").value
    const fav_alcohol = document.getElementById("fav_alcohol").value
    const amo_alcohol = document.getElementById("amo_alcohol").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/profile/${user_id}/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "user_id": user_id,
            "password": password
        })
    });

    return response
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는 데 실패하였습니다.")
    }
}
