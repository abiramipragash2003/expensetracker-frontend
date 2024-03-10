const balance=document.getElementById("balance")
const income=document.getElementById("income")
const expense=document.getElementById("expense")
const category=document.getElementById("category")
const name=document.getElementById("name")
const cost=document.getElementById("cost")
const dashboard=document.getElementById("Dashboard")
const addincome=document.getElementById("addincome")
const addexpense=document.getElementById("addexpense")
const viewreport=document.getElementById("viewreport")
const logout=document.getElementById("logout")
const section2=document.getElementById("section2")
const section3=document.getElementById("section3")
const section4=document.getElementById("section4")
const dashboardmonth=document.getElementById("month")

// Create a new Date object
var today = new Date();

// Format the date to YYYY-MM-DD from ISO STRING --- > YYYY-MM-DDTHH:MM:SS.sssZ
var formattedDate = today.toISOString().slice(0,10);
var dateObject = new Date(formattedDate);

// Get the month name in the "long" format (e.g., "January")
var monthName = dateObject.toLocaleDateString('en-US', { month: 'long' });
dashboardmonth.innerText=monthName
document.getElementById("expensedate").setAttribute("max", formattedDate);
document.getElementById("incomedate").setAttribute("max", formattedDate);

const url=`http://localhost:9090/expensetracker`
fetchData()

//to fetch total income,expense,balance,transactionlist
async function fetchData()
 {
    const apiUrl = `${url}/month/${formattedDate}`

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();


        //to show the total income,expense,balance at the dashboard
        balance.innerText=data.balance;
        income.innerText=data.totalIncome;
        expense.innerText=data.totalExpense;


        //to show the transactions list
        console.log(data)
        if(typeof data==="object" && data.expenseTracker!=null)
        {
            document.getElementById("transactionholder").innerHTML = ""; // clear no transactions
            if(data.expenseTracker.length<=5)
            {
                data.expenseTracker.forEach(element=>
                    {
                        transactionslist(element)

                    })
            }
            else
            {
            
            for(i=0;i<5;i++)
            {
                transactionslist(data.expenseTracker[i])
            }
        }
        }
       
       
    }
    catch(error)
    {
        console.error(error)
    }
}

// To display the transcations in the Hi User Section
function transactionslist(element)
{
    const Transaction=document.createElement("div")
    Transaction.id="transaction"
    const categoryandname=document.createElement("div")
    const category=document.createElement("p")
    category.innerText="Category : "+element.category
    const name=document.createElement("p")
    name.innerText="Name : "+element.name
    const Cost=document.createElement("div")
    const cost=document.createElement("span")
    if(element.type=="expense")
    {
        cost.innerHTML="-"+element.cost
    }
    else
    {
        cost.innerHTML=element.cost
    }
    
    document.getElementById("transactionholder").appendChild(Transaction);
    Transaction.appendChild(categoryandname);
    categoryandname.appendChild(category);
    categoryandname.appendChild(name);
    Transaction.appendChild(Cost);
    Cost.appendChild(cost);
}

// Function to handle click events
function handleButtonClick(clickedElement, displaySection) {

    // Reset all background colors
    [dashboard, addincome, addexpense, viewreport].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    // Set background color of clicked element
    clickedElement.style.backgroundColor = "rgb(77, 142, 204)";

    // Hide all sections
    [section2, section3, section4].forEach(section => {
        section.style.display = "none";
    });

    // Display the selected section
    displaySection.style.display = "inline";
}

// Event listeners
dashboard.addEventListener('click', () => handleButtonClick(dashboard, section2));
addincome.addEventListener('click', () => handleButtonClick(addincome, section3));
addexpense.addEventListener('click', () => handleButtonClick(addexpense, section4));
viewreport.addEventListener('click', () => handleButtonClick(viewreport, null)); // No section to display


// dashboard.addEventListener('click',()=>{
   
//     dashboard.style.backgroundColor="rgb(77, 142, 204)"
//     addincome.style.backgroundColor="rgb(43, 42, 42)"
//     section2.style.display="inline"
//     section3.style.display="none"
//     section4.style.display="none"
//     addexpense.style.backgroundColor="rgb(43, 42, 42) "
//     viewreport.style.backgroundColor="rgb(43, 42, 42)"
// })

// addincome.addEventListener('click',()=>{
//     addincome.style.backgroundColor="rgb(77, 142, 204)"
//     dashboard.style.backgroundColor="rgb(43, 42, 42)"
//     section2.style.display="none"
//     section3.style.display="inline"
//     section4.style.display="none"
//     addexpense.style.backgroundColor="rgb(43, 42, 42)"
//     viewreport.style.backgroundColor="rgb(43, 42, 42)"
// })

// addexpense.addEventListener('click',()=>{
//     addexpense.style.backgroundColor="rgb(77, 142, 204)"
//     dashboard.style.backgroundColor="rgb(43, 42, 42)"
//     section2.style.display="none"
//     section4.style.display="inline"
//     section3.style.display="none"
//     viewreport.style.backgroundColor="rgb(43, 42, 42)"
//     addincome.style.backgroundColor="rgb(43, 42, 42)"

    
    
// })


// viewreport.addEventListener('click',()=>{
//     viewreport.style.backgroundColor="rgb(77, 142, 204)"
//     dashboard.style.backgroundColor="rgb(43, 42, 42)"
//     addincome.style.backgroundColor="rgb(43, 42, 42)"
//     addexpense.style.backgroundColor="rgb(43, 42, 42)"
    
// })

const submitincome=document.getElementById("submitincome")
submitincome.addEventListener("click",async (event)=>{
    event.preventDefault();
    const incomecategory=document.getElementById("incomecategory")
    const incomenote=document.getElementById("incomenote")
    const incomecost=document.getElementById("incomecost")
    const incomedate=document.getElementById("incomedate")
    // Check if any required field is empty
    if (incomecategory.value === "Choose Category"  || incomecost.value === "" || incomedate.value === "") {
        alert("Please fill in all required fields.");
        return;
    }
    if (incomecost.value <= 0 || isNaN(incomecost.value)) {
        alert("Cost must be a positive number.");
        return;
    }
    
    const incomedata={
        userName:"abi",
        type:"income",
        incomeCategory:incomecategory.value,
        incomeName:incomenote.value,
        cost:incomecost.value,
        incomeDate:incomedate.value
      

    }
   
    try 
    {
        const checkResponse = await fetch(`${url}/income`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify(incomedata)
            
        });   
        if(checkResponse.ok)
        {
        //fetchData()
        
        fetchData()
        submitincome.innerText="success"
        submitincome.style.backgroundColor="black"
        setTimeout( ()=>{
            window.location.reload()
        },1500)
        }
        else
        {
        submitincome.innerText="Not success"
        submitincome.style.backgroundColor="red"
        }    
        }
        catch(error)
        {
            console.error(error)
        }
        
})

const submitexpense=document.getElementById("submitexpense")
submitexpense.addEventListener("click",async (event)=>{
    event.preventDefault()

    const expensecategory=document.getElementById("expensecategory")
    const expensenote=document.getElementById("expensenote")
    const expensecost=document.getElementById("expensecost")
    const expensedate=document.getElementById("expensedate")

    if (expensecategory.value === "Choose Category" || expensecost.value === "" || expensedate.value === "") {
        alert("Please fill in all required fields.");
        return;
    }
    if (expensecost.value <= 0 || isNaN(expensecost.value)) {
        alert("Cost must be a positive number.");
        return;
    }
    const expensedata={
        userName:"abi",
        type:"expense",
        expenseCategory:expensecategory.value,
        expenseName:expensenote.value,
        cost:expensecost.value,
        expenseDate:expensedate.value

    }

    try {
        const checkResponse = await fetch(`${url}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify(expensedata)
        });       
        
        if(checkResponse.ok)
        {
        //fetchData()
        document.getElementById("transactionholder").innerHTML = "";
        fetchData()
        submitexpense.innerText="success"

        submitexpense.style.backgroundColor="black"

        setTimeout( ()=>{
            window.location.reload()
        },10000)
        }
        else
        {

        submitexpense.innerText="Not success"
        submitexpense.style.backgroundColor="red"
        }    
    }
        catch(error)
        {
            console.error(error)
        }
})

