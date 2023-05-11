async function handleSignin() {
    const email = document.getElementById("email").value
    const user_id = document.getElementById("user_id").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    console.log(email, user_id, password)
    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "user_id": user_id,
            "nickname": nickname
        })
    })
    console.log(response)
}