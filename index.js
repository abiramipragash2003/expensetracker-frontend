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
const section1=document.getElementById("section1")
const section2=document.getElementById("section2")
const section3=document.getElementById("section3")
const section4=document.getElementById("section4")
const section5=document.getElementById("section5")
const section6=document.getElementById("section6")
const navreport=document.getElementById("navreport")
const dashboardmonth=document.getElementById("month")
const dashboardreport=document.getElementById("Dashboard1")
const datereport=document.getElementById("datereport")
const yearreport=document.getElementById("yearreport")
const viewreportnew=document.getElementById("viewreportnew")
const reporthead=document.getElementById("reporthead")
const buttondate=document.createElement("input")
const buttonyear=document.createElement("input")
//const section6=document.getElementById("section6")

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
fetchData(`${url}/month/${formattedDate}`) // function call

//to fetch total income,expense,balance,transactionlist
async function fetchData(apiUrl)
 {

    try {
        const response = await fetch(apiUrl);

        if (!response.ok)
        {
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
            data.expenseTracker.forEach(element=>
                {
                    transactionslist(element)
                })
        }
    }
    catch(error)
    {
        console.error(error)
    }
}


async function fetchReportData(apiUrl)
 {

    try {
        const response = await fetch(apiUrl);

        if (!response.ok)
        {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        //to show the total income,expense,balance at the dashboard
        reportbalance.innerText=data.balance;
        reportincome.innerText=data.totalIncome;
        reportexpense.innerText=data.totalExpense;
        //to show the transactions list
        console.log(data)
        if(typeof data==="object" && data.expenseTracker!=null)
        {
            document.getElementById("reporttransactionholder").innerHTML = ""; // clear no transactions
            data.expenseTracker.forEach(element=>
                {
                    reporttransactionslist(element)
                })
        }
        else{
            document.getElementById("reporttransactionholder").innerHTML = "";
            const notransactionmsg=document.createElement("p")
            notransactionmsg.id="reportnotransaction"
            notransactionmsg.innerText="No Transactions"
            document.getElementById("reporttransactionholder").append(notransactionmsg)

        }
    }
    catch(error)
    {
        console.error(error)
    }
}
function transactionslist(element)
{
    const Transaction=document.createElement("div")
    Transaction.id="transaction"
    const dateBox=document.createElement("div")
    dateBox.id="dateBox"
    const date=document.createElement("span")
    const month=document.createElement("span")
    const year=document.createElement("span")

    dateArray=element.date.split("-")    //[2024,03,01]
    if(dateArray[2].split("0")[0]=="")
    {
        date.innerText=dateArray[2].split("0")[1];
    }
    else
    {
        date.innerText=dateArray[2];
    }

    monthArray=["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(dateArray[1].split("0")[0]=="")//03-->[ " ","3"]
    {
        month.innerText=monthArray[dateArray[1].split("0")[1]];    
    }
    else
    {
        month.innerText=monthArray[dateArray[1]];
    }
    month.style.fontSize="small"
    year.innerText=dateArray[0]
    year.style.fontSize="small"
    const categoryandname=document.createElement("div")
    categoryandname.id="categoryandname"
    const category=document.createElement("span")
    category.innerText="Category : "+element.category
    const name=document.createElement("span")
    name.innerText="Name : "+element.name
    // const viewdate=document.createElement("span")
    // viewdate.innerText="Date :"+element.date
    const Cost=document.createElement("div")
    Cost.style.marginLeft="auto"
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
    Transaction.append(dateBox,categoryandname,Cost);
    dateBox.append(month,date,year)
    categoryandname.append(category,name);
    Cost.appendChild(cost);
}



// To display the transcations in the Hi User Section
function reporttransactionslist(element)
{
    const Transaction=document.createElement("div")
    Transaction.id="reporttransaction"
    const dateBox=document.createElement("div")
    dateBox.id="dateBox"
    const date=document.createElement("span")
    const month=document.createElement("span")
    const year=document.createElement("span")

    dateArray=element.date.split("-")    //[2024,03,01]
    if(dateArray[2].split("0")[0]=="")
    {
        date.innerText=dateArray[2].split("0")[1];
    }
    else
    {
        date.innerText=dateArray[2];
    }

    monthArray=["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(dateArray[1].split("0")[0]=="")//03-->[ " ","3"]
    {
        month.innerText=monthArray[dateArray[1].split("0")[1]];    
    }
    else
    {
        month.innerText=monthArray[dateArray[1]];
    }
    month.style.fontSize="small"
    year.innerText=dateArray[0]
    year.style.fontSize="small"
    const categoryandname=document.createElement("div")
    categoryandname.id="categoryandname"
    const category=document.createElement("span")
    category.innerText="Category : "+element.category
    const name=document.createElement("span")
    name.innerText="Name : "+element.name
    // const viewdate=document.createElement("span")
    // viewdate.innerText="Date :"+element.date
    const Cost=document.createElement("div")
    Cost.style.marginLeft="auto"
    const cost=document.createElement("span")
    if(element.type=="expense")
    {
        cost.innerHTML="-"+element.cost
    }
    else
    {
        cost.innerHTML=element.cost
    }
    

    document.getElementById("reporttransactionholder").appendChild(Transaction);
    Transaction.append(dateBox,categoryandname,Cost);
    dateBox.append(month,date,year)
    categoryandname.append(category,name);
    Cost.appendChild(cost);
}

// Function to handle click events
function handleButtonClick(clickedElement, displaySection)
{

    // Reset all background colors
    [dashboard, addincome, addexpense, viewreport].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    // Set background color of clicked element
    clickedElement.style.backgroundColor = "rgb(77, 142, 204)";

    // Hide all sections
    [section2, section3, section4, section5,navreport].forEach(section => {
        section.style.display = "none";
    });

    // Display the selected section
    displaySection.style.display = "inline";
}



// Event listeners
dashboard.addEventListener('click', () => handleButtonClick(dashboard, section2));
addincome.addEventListener('click', () => handleButtonClick(addincome, section3));
addexpense.addEventListener('click', () => handleButtonClick(addexpense, section4));
viewreport.addEventListener('click', () => {
        
        [dashboard, addincome, addexpense].forEach(element => {
            element.style.backgroundColor = "rgb(43, 42, 42)";
        });

        [section1,section2, section3, section4, section6].forEach(section => {
            section.style.display = "none";
        });

        viewreport.style.backgroundColor="rgb(77, 142, 204)"
        navreport.style.display="inline"
        section5.style.display="inline"

        const monthdropdown=document.getElementById("reportmonth")
        // const months = [
        //     { name: "Jan", value: "01" },
        //     { name: "Feb", value: "02" },
        //     { name: "Mar", value: "03" },
        //     { name: "Apr", value: "04" },
        //     { name: "May", value: "05" },
        //     { name: "June", value: "06" },
        //     { name: "July", value: "07" },
        //     { name: "Aug", value: "08" },
        //     { name: "Sept", value: "09" },
        //     { name: "Oct", value: "10" },
        //     { name: "Nov", value: "11" },
        //     { name: "Dec", value: "12" }
        // ];
        // months.forEach(month => {
        //     const option = document.createElement("option");
        //     option.value = month.value;
        //     option.textContent = month.name;

        //     monthdropdown.appendChild(option);
        // });
        const selectmonth=monthdropdown.value;
        
        fetchReportData(`${url}/month/2024-${selectmonth}-01`) 

        monthdropdown.addEventListener("change",()=>
        {
            document.getElementById("reporttransactionholder").innerHTML = "";
            const selectedmonth=monthdropdown.value;
            console.log(selectedmonth)
            fetchReportData(`${url}/month/2024-${selectedmonth}-01`) 
        })
        
}); 


datereport.addEventListener('click', () => {
        
    [dashboard,yearreport,viewreportnew].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    [section1,section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    datereport.style.backgroundColor="rgb(77, 142, 204)"
    navreport.style.display="inline"
    section5.style.display="inline"
    reporthead.innerText="View For Date"
    reportmonth.style.display="none"
    buttonyear.style.display="none"
    buttondate.style.display="block"
    buttondate.id="buttondate"
    buttondate.type = "date"; 
    buttondate.style.backgroundColor = "rgb(77, 142, 204)";
    buttondate.max = formattedDate;
    buttondate.value = formattedDate
    document.getElementById("reportmain").appendChild(buttondate)
    document.getElementById("reporttransactionholder").innerHTML = "";
    fetchReportData(`${url}/date/${formattedDate}`) 
    
    buttondate.addEventListener("change",()=>
    {
        const dateentered=buttondate.value
        document.getElementById("reporttransactionholder").innerHTML = "";
        fetchReportData(`${url}/date/${dateentered}`) 
    })
    
}); 

yearreport.addEventListener('click', () => {

    //buttondate.style.display="none"
        
    [dashboard,datereport,viewreportnew].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    [section1,section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    yearreport.style.backgroundColor="rgb(77, 142, 204)"
    navreport.style.display="inline"
    section5.style.display="inline"
    reporthead.innerText="Yearly Report"
    reportmonth.style.display="none"
    buttondate.style.display="none"
    buttonyear.style.display="block"
    buttonyear.type = "month"; 
    buttonyear.id = "buttonyear"
    
    buttonyear.style.backgroundColor = "rgb(77, 142, 204)";
    var formattedyear=formattedDate.split("-")
    formattedyear=`${formattedyear[0]}-${formattedyear[1]}`
    buttonyear.max = formattedyear;
    buttonyear.value = formattedyear

    console.log(buttonyear.value)
    document.getElementById("reportmain").appendChild(buttonyear)

    fetchReportData(`${url}/year/${formattedDate}`) 

    buttonyear.addEventListener("change",()=>
    {
        const yearentered=buttonyear.value
        
        document.getElementById("reporttransactionholder").innerHTML = "";
        console.log(`${yearentered}-01`)
        fetchReportData(`${url}/year/${yearentered}-01`) 
    })
    
});

dashboardreport.addEventListener('click',()=>
{
    window.location.reload();
})



const submitincome=document.getElementById("submitincome")
submitincome.addEventListener("click",async(event)=>
{
    event.preventDefault();
    const incomecategory=document.getElementById("incomecategory")
    const incomenote=document.getElementById("incomenote")
    const incomecost=document.getElementById("incomecost")
    const incomedate=document.getElementById("incomedate")
    // Check if any required field is empty
    if (incomecategory.value === "Choose Category"  || incomecost.value === "" || incomedate.value === "")
    {
        alert("Please fill in all required fields.");
        return;
    }
    if (incomecost.value <= 0 || isNaN(incomecost.value))
    {
        alert("Cost must be a positive number.");
        return;
    }
    const incomedata=
    {
        userName:"abi",
        type:"income",
        incomeCategory:incomecategory.value,
        incomeName:incomenote.value,
        cost:incomecost.value,
        incomeDate:incomedate.value
    }
   
    //posting to the backend
    try 
    {
        const checkResponse = await fetch(`${url}/income`,
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incomedata)
        });   
            if(checkResponse.ok)
            {
                fetchData()
                submitincome.innerText="success"
                submitincome.style.backgroundColor="black"
                setTimeout( ()=>
                {
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
        },1000)
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



function transactionslist1(element)
{
    const Transaction=document.createElement("div")
    Transaction.id="transaction1"
    const dateBox=document.createElement("div")
    dateBox.id="dateBox"
    const date=document.createElement("span")
    const month=document.createElement("span")
    const year=document.createElement("span")
    dateArray=element.date.split("-")    //[2024,03,01]

    if(dateArray[2].split("0")[0]=="")
    {

        date.innerText=dateArray[2].split("0")[1];
    }
    else
    {
        date.innerText=dateArray[2];
    }

    monthArray=["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(dateArray[1].split("0")[0]=="")//03-->[ " ","3"]
    {
        
        month.innerText=monthArray[dateArray[1].split("0")[1]];
        
    }
    else
    {
       
        month.innerText=monthArray[dateArray[1]];
        
    }
    month.style.fontSize="small"
    year.innerText=dateArray[0]
    year.style.fontSize="small"
    
    const categoryandname=document.createElement("div")
    categoryandname.id="categoryandname"
    const category=document.createElement("span")
    category.innerText="Category : "+element.category
    const name=document.createElement("span")
    name.innerText="Name : "+element.name
    // const viewdate=document.createElement("span")
    // viewdate.innerText="Date :"+element.date
    const Cost=document.createElement("div")
    Cost.style.marginLeft="auto"
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
    Transaction.append(dateBox,categoryandname,Cost);
    dateBox.append(month,date,year)
    categoryandname.append(category,name);
    Cost.appendChild(cost);
}

