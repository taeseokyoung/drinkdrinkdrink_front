const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}

async function handleSignup() {
    console.log('회원가입')
    const email = document.getElementById("email").value
    const user_id = document.getElementById("user_id").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value
    const age = document.getElementById("age").value
    const profile_img = document.getElementById("profile_img").files[0]
    const fav_alcohol = document.getElementById("fav_alcohol").value
    const amo_alcohol = document.getElementById("amo_alcohol").value
    const formdata = new FormData();
    console.log(user_id, 'user_id')
    if (!user_id) { return alert("아이디는 필수입력사항입니다!") }
    else if (!password) { return alert("비밀번호는 필수 입력사항입니다!") }
    else if (password != password_check) { return alert("비밀번호를 확인해주세요!") }
    else if (!email) { return alert("이메일은 필수입력사항입니다!") }
    else if (age <= 20) { return alert('미성년자는 가입할 수 없습니다') }

    formdata.append('email', email)
    formdata.append('user_id', user_id)
    formdata.append('password', password)
    formdata.append('password_check', password_check)
    formdata.append('age', age)
    formdata.append('nickname', nickname)
    formdata.append('fav_alcohol', fav_alcohol)
    formdata.append('amo_alcohol', amo_alcohol)
    if (profile_img) { formdata.append('profile_img', profile_img) }
    console.log(formdata)
    const response = await fetch(`${backend_base_url}/users/signup/`, {
        method: 'POST',
        body: formdata
    }
    )
    if (response.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/doc/login.html`)
    } else if (response.status == 400) { alert("회원가입에 실패했습니다.") }
    console.log(response)
}

async function handleSignupButton() {
    const response = await handleSignin();

    if (response.statue == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/doc/login.html`)
    } else if (response.status == 400) { alert("회원가입에 실패했습니다.") }
    console.log(response)
}
