const submitsignup = document.getElementById("submitsignup");
const url = "http://localhost:9090/auth"
submitsignup.addEventListener('click', async (event) => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mailid = document.getElementById("mailid").value;
    const mobileno = document.getElementById("mobileno").value;
    event.preventDefault()
    const signupdata =
    {
        "username": username,
        "userPassword": password,
        "userMailId": mailid,
        "userMobileNumber": mobileno
    }
    console.log(signupdata)
    try {
        const checkResponse = await fetch(`${url}/signup`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupdata)
            });
        if (checkResponse.ok) {
            const responseJson = await checkResponse.text(); // Parse response as JSON
            token = responseJson;
            localStorage.setItem("token", token)
            console.log(token);
            submitsignup.innerText = "success"
            submitsignup.style.backgroundColor = "black"
            window.location.href = "index.html";


        }
        else {
            submitsignup.innerText = "Username already Exists"
            submitsignup.style.backgroundColor = "red"
        }
    }
    catch (error) {
        console.error(error)
    }
})