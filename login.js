const submit=document.getElementById("submitlogin")
const username=document.getElementById("username")
const password=document.getElementById("password")
const url=`http://localhost:9090/auth`
submit.addEventListener('click',async(event)=>
{
    event.preventDefault()
    const register=
    {
        "username":username.value,
        "userPassword":password.value,
    }
    try 
    {
        const checkResponse = await fetch(`${url}/login`,
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
                
                submitlogin.innerText="success"
                submitlogin.style.backgroundColor="black"
                window.location.href = "index.html";
                
            }
            else
            {
                submitlogin.innerText="Not success"
                submitlogin.style.backgroundColor="red"
            }    
    }
    catch(error)
    {
        console.error(error)
    } 
})