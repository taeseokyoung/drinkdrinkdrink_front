async function handleSignupButton() {
    const response = await handleSignin();

    if (response.statue == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/login.html`)
    }

}