const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

async function handleSignup() {
    const email = document.getElementById("email").value
    const user_id = document.getElementById("user_id").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const age = document.getElementById("age").value
    const profile_img = document.getElementById("profile_img").files[0]
    const fav_alcohol = document.getElementById("fav_alcohol").value
    const amo_alcohol = document.getElementById("amo_alcohol").value
    const formdata = new FormData();

    formdata.append('email', email)
    formdata.append('user_id', user_id)
    formdata.append('nickname', nickname)
    formdata.append('password', password)
    formdata.append('age', age)
    formdata.append('profile_img', profile_img)
    formdata.append('fav_alcohol', fav_alcohol)
    formdata.append('amo_alcohol', amo_alcohol)
    console.log(formdata)
    const response = await fetch(`${backend_base_url}/users/signup/`, {
        method: 'POST',
        body: formdata
    }
    )

    if (response.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/doc/signin.html`)
    }
    console.log(response)
}
