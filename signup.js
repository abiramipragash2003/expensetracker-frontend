const submit=document.getElementById("submitsignup").value;
const username=document.getElementById("username").value;
const password=document.getElementById("password").value;
const mailid=document.getElementById("mailid").value;
const mobileno=document.getElementById("mobileno").value;
// const url=`http://localhost:9090/auth`
submitsignup.addEventListener('click',async(event)=>
{
    event.preventDefault()
    const register=
    {
        "username":username,
        "userPassword":password,
        "userMailId":mailid,
        "userMobileNumber":mobileno
    }
    try 
    {
        const checkResponse = await fetch(`http://localhost:9090/auth/signup`,
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register)
        });   
            if(checkResponse.ok)
            {
                
                submitsignup.innerText="success"
                submitsignup.style.backgroundColor="black"
                window.location.href = "login.html";
                
            }
            else
            {
                submitsignup.innerText="Not success"
                submitsignup.style.backgroundColor="red"
            }    
    }
    catch(error)
    {
        console.error(error)
    } 
})