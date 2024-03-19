const submitlogin = document.getElementById("submitlogin")
const url = "http://localhost:9090/auth"
let token = "";
const signup = document.getElementById("signupbutton")
signup.addEventListener('click', () => {
    signup.style.backgroundColor = "rgb(77, 142, 204)"
    window.location.href = "signup.html"
})
submitlogin.addEventListener('click', async (event) => {

    const username = document.getElementById("username")
    const password = document.getElementById("password")
    event.preventDefault()
    const login =
    {
        "username": username.value,
        "userPassword": password.value,
    }
    console.log(login)

    try {
        const checkResponse = await fetch(`${url}/login`,
            {

                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            });
        if (checkResponse.ok) {
            const responseJson = await checkResponse.text(); // Parse response as JSON
            token = responseJson;
            localStorage.setItem("token", token)
            console.log(token);
            submitlogin.innerText = "Success"
            submitlogin.style.backgroundColor = "black"
            window.location.href = "index.html";


        }
        else {
            submitlogin.innerText = "Unknown Credentials , Please sign up"
            submitlogin.style.backgroundColor = "red"
            submitlogin.style.width="350px"
            setTimeout(()=>{
                window.location.href = "login.html"  
            },1500)


        }
    }
    catch (error) {
        console.log(error)
        console.error(error)
    }
})