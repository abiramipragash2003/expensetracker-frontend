const signupform = document.getElementById("signupform");
const submitsignup = document.getElementById("submitsignup");


const url = "http://localhost:9090/auth"
signupform.addEventListener('submit', async (event) => {
    //submit event validates conditions
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mailid = document.getElementById("mailid").value;
    const mobileno = document.getElementById("mobileno").value;


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
            submitsignup.innerText = "Success"
            submitsignup.style.backgroundColor = "green"
            setTimeout(() => {
                window.location.href = "index.html"
            }, 1500)
        }
        else {
            submitsignup.innerText = "Not Registered"
            submitsignup.style.backgroundColor = "red"
            submitsignup.style.width = "200px"
        }
    }
    catch (error) {
        console.error(error)
    }
})

document.getElementById("username").addEventListener('change', async () => {
    const username = document.getElementById("username").value;
    try {
        const checkResponse = await fetch(`${url}/username/${username}`)

        if (checkResponse.ok) 
        {
            const responseJson = await checkResponse.text();
            if (responseJson == "Username already exists")
            {
                submitsignup.style.backgroundColor = "red";
                submitsignup.style.width = "250px"
                submitsignup.innerText = responseJson
            }
            else 
            {
                submitsignup.style.backgroundColor = "green"
                submitsignup.style.width = "200px"
                submitsignup.innerText = responseJson
            }
        }
    }
    catch (error) {
        console.error(error)
    }

})

document.getElementById("password").addEventListener('click', () => {
    submitsignup.style.backgroundColor = "rgb(77, 142, 204)";
    submitsignup.innerText = "Submit"
    submitsignup.style.width = ""

})


document.getElementById("mobileno").addEventListener('change', () => {
    const mobileno = document.getElementById("mobileno").value;
    if (!/^\d{10}$/.test(mobileno)) {
        submitsignup.innerText = "Enter numbers only for a length of 10"
        submitsignup.style.backgroundColor = "red";
        submitsignup.style.width = "450px"
    }
    else {
        submitsignup.style.backgroundColor = "rgb(77, 142, 204)";
        submitsignup.innerText = "Submit"
        submitsignup.style.width = ""
    }
})



