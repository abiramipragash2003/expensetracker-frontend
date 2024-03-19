const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const name = document.getElementById("name")
const cost = document.getElementById("cost")
const dashboard = document.getElementById("Dashboard")
const addincome = document.getElementById("addincome")
const addexpense = document.getElementById("addexpense")
const viewreport = document.getElementById("viewreport")
const logout = document.getElementById("logout")
const section1 = document.getElementById("section1")
const section2 = document.getElementById("section2")
const section3 = document.getElementById("section3")
const section4 = document.getElementById("section4")
const section5 = document.getElementById("section5")
const section6 = document.getElementById("section6")
const navreport = document.getElementById("navreport")
const dashboardmonth = document.getElementById("month")
const dashboardreport = document.getElementById("Dashboard1")
const datereport = document.getElementById("datereport")
const yearreport = document.getElementById("yearreport")
const viewreportnew = document.getElementById("viewreportnew")
const reporthead = document.getElementById("reporthead")
const buttondate = document.createElement("input")
const buttonyear = document.createElement("input")
const token = localStorage.getItem("token")
const totallogout = document.getElementById("logout")
const username = decodeToken(token);


document.getElementById("user").innerText = username
var today = new Date();
// Format the date to YYYY-MM-DD from ISO STRING --- > YYYY-MM-DDTHH:MM:SS.sssZ
var formattedDate = today.toISOString().slice(0, 10);
var dateObject = new Date(formattedDate);
// Get the month name in the "long" format (e.g., "January")
var monthName = dateObject.toLocaleDateString('en-US', { month: 'long' });
dashboardmonth.innerText = monthName
document.getElementById("expensedate").setAttribute("max", formattedDate);
document.getElementById("incomedate").setAttribute("max", formattedDate);

// function to decode token
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub;
}


const url = `http://localhost:9090/expensetracker`
fetchData(`${url}/month/${formattedDate}`) // function call

//to fetch total income,expense,balance,transactionlist in dashboard
async function fetchData(apiUrl) {

    try {
        console.log(`Bearer ${token}`)
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers:
            {
                'Authorization': `Bearer ${token}`
            }

        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        //to show the total income,expense,balance at the dashboard
        balance.innerText = data.balance;
        income.innerText = data.totalIncome;
        expense.innerText = data.totalExpense;
        //to show the transactions list
        console.log(data)
        if (typeof data === "object" && data.expenseTracker != null) {
            document.getElementById("transactionholder").innerHTML = ""; // clear no transactions
            data.expenseTracker.forEach(element => {
                transactionslist(element)
            })
            var pieValues = Object.values(data.expenseMap);
            var pieInfo = Object.keys(data.expenseMap);
            drawReportPieChart(pieValues, pieInfo, document.getElementById("pieChart"));
            document.getElementById("incomebtn").addEventListener('click', () => {
                document.getElementById('gid').innerHTML = '';
                var pieValues = Object.values(data.incomeMap);
                var pieInfo = Object.keys(data.incomeMap);
                drawReportPieChart(pieValues, pieInfo, document.getElementById("pieChart"));
            })
            document.getElementById("expensebtn").addEventListener('click', () => {
                document.getElementById('gid').innerHTML = '';
                var pieValues = Object.values(data.expenseMap);
                var pieInfo = Object.keys(data.expenseMap);
                drawReportPieChart(pieValues, pieInfo, document.getElementById("pieChart"));
            })
        }
    }
    catch (error) {
        console.error(error)
    }
}

//to fetch data at the report section
async function fetchReportData(apiUrl) {

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers:
            {
                'Authorization': `Bearer ${token}`
            },

        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        //to show the total income,expense,balance at the dashboard
        reportbalance.innerText = data.balance;
        reportincome.innerText = data.totalIncome;
        reportexpense.innerText = data.totalExpense;
        //to show the transactions list
        console.log(data)
        if (typeof data === "object" && data.expenseTracker != null) {
            document.getElementById("reporttransactionholder").innerHTML = ""; // clear no transactions
            data.expenseTracker.forEach(element => {
                reporttransactionslist(element)
            })
            console.log(data)
            console.log(data.expenseMap)
            document.getElementById('egid').innerHTML = '';
            var pieValues = Object.values(data.expenseMap);
            var pieInfo = Object.keys(data.expenseMap);
            console.log(pieValues)
            if (pieValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0) != 0) {

                drawReportPieChart(pieValues, pieInfo, document.getElementById("epieChart"));
            }
            document.getElementById('igid').innerHTML = '';
            var pieValues = Object.values(data.incomeMap);
            var pieInfo = Object.keys(data.incomeMap);
            if (pieValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0) != 0) {

                drawReportPieChart(pieValues, pieInfo, document.getElementById("ipieChart"));
            }

        }
        else {
            document.getElementById("reporttransactionholder").innerHTML = "";
            const notransactionmsg = document.createElement("p")
            notransactionmsg.id = "reportnotransaction"
            notransactionmsg.innerText = "No Transactions"
            document.getElementById("reporttransactionholder").append(notransactionmsg)
            // const piemsg=createElement("text")
            // piemsg.innerText="No"
            // document.getElementById("epieChart").append(piemsg)
            document.getElementById('egid').innerHTML = '';
            document.getElementById('igid').innerHTML = '';

        }

    }
    catch (error) {
        console.error(error)
    }
}

//to show the elements at the dashboard
function transactionslist(element) {
    const Transaction = document.createElement("div")
    Transaction.id = "transaction"
    const dateBox = document.createElement("div")
    dateBox.id = "dateBox"
    const date = document.createElement("span")
    const month = document.createElement("span")
    const year = document.createElement("span")

    dateArray = element.date.split("-")    //[2024,03,01]
    if (dateArray[2].split("0")[0] == "") {
        date.innerText = dateArray[2].split("0")[1];
    }
    else {
        date.innerText = dateArray[2];
    }

    monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (dateArray[1].split("0")[0] == "")//03-->[ " ","3"]
    {
        month.innerText = monthArray[dateArray[1].split("0")[1]];
    }
    else {
        month.innerText = monthArray[dateArray[1]];
    }
    month.style.fontSize = "small"
    year.innerText = dateArray[0]
    year.style.fontSize = "small"
    const categoryandname = document.createElement("div")
    categoryandname.id = "categoryandname"
    const category = document.createElement("span")
    category.innerText = "Category : " + element.category
    const name = document.createElement("span")
    name.innerText = "Name : " + element.name
    // const viewdate=document.createElement("span")
    // viewdate.innerText="Date :"+element.date
    const Cost = document.createElement("div")
    Cost.style.marginLeft = "auto"
    const cost = document.createElement("span")
    if (element.type == "expense") {
        cost.innerHTML = "-" + element.cost
    }
    else {
        cost.innerHTML = element.cost
    }


    document.getElementById("transactionholder").appendChild(Transaction);
    Transaction.append(dateBox, categoryandname, Cost);
    dateBox.append(month, date, year)
    categoryandname.append(category, name);
    Cost.appendChild(cost);
}

// To display the transcations in the Hi User Section
function reporttransactionslist(element) {
    const Transaction = document.createElement("div")
    Transaction.id = "reporttransaction"
    const dateBox = document.createElement("div")
    dateBox.id = "dateBox"
    const date = document.createElement("span")
    const month = document.createElement("span")
    const year = document.createElement("span")

    dateArray = element.date.split("-")    //[2024,03,01]
    if (dateArray[2].split("0")[0] == "") {
        date.innerText = dateArray[2].split("0")[1];
    }
    else {
        date.innerText = dateArray[2];
    }

    monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (dateArray[1].split("0")[0] == "")//03-->[ " ","3"]
    {
        month.innerText = monthArray[dateArray[1].split("0")[1]];
    }
    else {
        month.innerText = monthArray[dateArray[1]];
    }
    month.style.fontSize = "small"
    year.innerText = dateArray[0]
    year.style.fontSize = "small"
    const categoryandname = document.createElement("div")
    categoryandname.id = "categoryandname"
    const category = document.createElement("span")
    category.innerText = "Category : " + element.category
    const name = document.createElement("span")
    name.innerText = "Name : " + element.name
    // const viewdate=document.createElement("span")
    // viewdate.innerText="Date :"+element.date
    const Cost = document.createElement("div")
    Cost.style.marginLeft = "auto"
    const cost = document.createElement("span")
    if (element.type == "expense") {
        cost.innerHTML = "-" + element.cost
    }
    else {
        cost.innerHTML = element.cost
    }


    document.getElementById("reporttransactionholder").appendChild(Transaction);
    Transaction.append(dateBox, categoryandname, Cost);
    dateBox.append(month, date, year)
    categoryandname.append(category, name);
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
    [section2, section3, section4, section5, navreport].forEach(section => {
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

    [section1, section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    viewreport.style.backgroundColor = "rgb(77, 142, 204)"
    navreport.style.display = "inline"
    section5.style.display = "inline"

    const monthdropdown = document.getElementById("reportmonth")
    const selectmonth = monthdropdown.value;

    fetchReportData(`${url}/month/2024-${selectmonth}-01`)

    monthdropdown.addEventListener("change", () => {
        document.getElementById("reporttransactionholder").innerHTML = "";
        const selectedmonth = monthdropdown.value;
        console.log(selectedmonth)
        fetchReportData(`${url}/month/2024-${selectedmonth}-01`)

    })

});

viewreportnew.addEventListener('click', () => {

    [dashboard, yearreport,datereport].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    [section1, section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    viewreportnew.style.backgroundColor = "rgb(77, 142, 204)"
    reporthead.innerText = "Monthly Report"
    navreport.style.display = "inline"
    section5.style.display = "inline"
    buttondate.style.display="none"
    buttonyear.style.display="none"
    reportmonth.style.display="inline"


    const monthdropdown = document.getElementById("reportmonth")
    const selectmonth = monthdropdown.value;

    fetchReportData(`${url}/month/2024-${selectmonth}-01`)

    monthdropdown.addEventListener("change", () => {
        document.getElementById("reporttransactionholder").innerHTML = "";
        const selectedmonth = monthdropdown.value;
        console.log(selectedmonth)
        fetchReportData(`${url}/month/2024-${selectedmonth}-01`)

    })

});


datereport.addEventListener('click', () => {

    [dashboard, yearreport, viewreportnew].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    [section1, section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    datereport.style.backgroundColor = "rgb(77, 142, 204)"
    navreport.style.display = "inline"
    section5.style.display = "inline"
    reporthead.innerText = "View For Date"
    reportmonth.style.display = "none"
    buttonyear.style.display = "none"
    buttondate.style.display = "block"
    buttondate.id = "buttondate"
    buttondate.type = "date";
    buttondate.style.backgroundColor = "rgb(77, 142, 204)";
    buttondate.max = formattedDate;
    buttondate.value = formattedDate
    document.getElementById("reportmain").appendChild(buttondate)
    document.getElementById("reporttransactionholder").innerHTML = "";
    fetchReportData(`${url}/date/${formattedDate}`)

    buttondate.addEventListener("change", () => {
        const dateentered = buttondate.value
        document.getElementById("reporttransactionholder").innerHTML = "";
        fetchReportData(`${url}/date/${dateentered}`)
    })

});

yearreport.addEventListener('click', () => {
    [dashboard, datereport, viewreportnew].forEach(element => {
        element.style.backgroundColor = "rgb(43, 42, 42)";
    });

    [section1, section2, section3, section4, section6].forEach(section => {
        section.style.display = "none";
    });

    yearreport.style.backgroundColor = "rgb(77, 142, 204)"
    navreport.style.display = "inline"
    section5.style.display = "inline"
    reporthead.innerText = "Yearly Report"
    reportmonth.style.display = "none"
    buttondate.style.display = "none"
    buttonyear.style.display = "block"
    buttonyear.type = "month";
    buttonyear.id = "buttonyear"

    buttonyear.style.backgroundColor = "rgb(77, 142, 204)";
    var formattedyear = formattedDate.split("-")
    formattedyear = `${formattedyear[0]}-${formattedyear[1]}`
    buttonyear.max = formattedyear;
    buttonyear.value = formattedyear

    console.log(buttonyear.value)
    document.getElementById("reportmain").appendChild(buttonyear)

    fetchReportData(`${url}/year/${formattedDate}`)

    buttonyear.addEventListener("change", () => {
        const yearentered = buttonyear.value

        document.getElementById("reporttransactionholder").innerHTML = "";
        console.log(`${yearentered}-01`)
        fetchReportData(`${url}/year/${yearentered}-01`)
    })

});

dashboardreport.addEventListener('click', () => {
    window.location.reload();
})



const submitincome = document.getElementById("submitincome")
submitincome.addEventListener("click", async (event) => {
    event.preventDefault();
    const incomecategory = document.getElementById("incomecategory")
    const incomenote = document.getElementById("incomenote")
    const incomecost = document.getElementById("incomecost")
    const incomedate = document.getElementById("incomedate")
    // Check if any required field is empty
    if (incomecategory.value === "Choose Category" || incomecost.value === "" || incomedate.value === "") {
        alert("Please fill in all required fields.");
        return;
    }
    if (incomecost.value <= 0 || isNaN(incomecost.value)) {
        alert("Cost must be a positive number.");
        return;
    }

    const incomedata =
    {

        username: username,
        type: "income",
        incomeCategory: incomecategory.value,
        incomeName: incomenote.value,
        cost: incomecost.value,
        incomeDate: incomedate.value
    }

    //posting to the backend
    try {
        const checkResponse = await fetch(`${url}/income`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(incomedata)
            });
        if (checkResponse.ok) {
            fetchData()
            submitincome.innerText = "success"
            submitincome.style.backgroundColor = "black"
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }
        else {
            submitincome.innerText = "Not success"
            submitincome.style.backgroundColor = "red"
        }
    }
    catch (error) {
        console.error(error)
    }
})

const submitexpense = document.getElementById("submitexpense")
submitexpense.addEventListener("click", async (event) => {
    event.preventDefault()

    const expensecategory = document.getElementById("expensecategory")
    const expensenote = document.getElementById("expensenote")
    const expensecost = document.getElementById("expensecost")
    const expensedate = document.getElementById("expensedate")

    if (expensecategory.value === "Choose Category" || expensecost.value === "" || expensedate.value === "") {
        alert("Please fill in all required fields.");
        return;
    }
    if (expensecost.value <= 0 || isNaN(expensecost.value)) {
        alert("Cost must be a positive number.");
        return;
    }
    const expensedata = {
        username: username,
        type: "expense",
        expenseCategory: expensecategory.value,
        expenseName: expensenote.value,
        cost: expensecost.value,
        expenseDate: expensedate.value

    }

    try {
        const checkResponse = await fetch(`${url}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(expensedata)
        });

        if (checkResponse.ok) {
            document.getElementById("transactionholder").innerHTML = "";
            fetchData()
            submitexpense.innerText = "success"

            submitexpense.style.backgroundColor = "black"

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
        else {

            submitexpense.innerText = "Not success"
            submitexpense.style.backgroundColor = "red"
        }
    }
    catch (error) {
        console.error(error)
    }
})



function transactionslist1(element) {
    const Transaction = document.createElement("div")
    Transaction.id = "transaction1"
    const dateBox = document.createElement("div")
    dateBox.id = "dateBox"
    const date = document.createElement("span")
    const month = document.createElement("span")
    const year = document.createElement("span")
    dateArray = element.date.split("-")    //[2024,03,01]

    if (dateArray[2].split("0")[0] == "") {

        date.innerText = dateArray[2].split("0")[1];
    }
    else {
        date.innerText = dateArray[2];
    }

    monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (dateArray[1].split("0")[0] == "")//03-->[ " ","3"]
    {

        month.innerText = monthArray[dateArray[1].split("0")[1]];

    }
    else {

        month.innerText = monthArray[dateArray[1]];

    }
    month.style.fontSize = "small"
    year.innerText = dateArray[0]
    year.style.fontSize = "small"

    const categoryandname = document.createElement("div")
    categoryandname.id = "categoryandname"
    const category = document.createElement("span")
    category.innerText = "Category : " + element.category
    const name = document.createElement("span")
    name.innerText = "Name : " + element.name
    const Cost = document.createElement("div")
    Cost.style.marginLeft = "auto"
    const cost = document.createElement("span")
    if (element.type == "expense") {
        cost.innerHTML = "-" + element.cost
    }
    else {
        cost.innerHTML = element.cost
    }

    document.getElementById("transactionholder").appendChild(Transaction);
    Transaction.append(dateBox, categoryandname, Cost);
    dateBox.append(month, date, year)
    categoryandname.append(category, name);
    Cost.appendChild(cost);
}
totallogout.addEventListener('click', () => {
    // try {
    //     const checkResponse = fetch(`${url}/auth/logout`,
    //         {
    //             method: 'POST',
    //             mode: 'no-cors'
    //         });
    //     if (checkResponse.ok) {
    //         console.log("logout")
    //         window.location.href = "login.html"
    //     }
    //     else {
    //         console.log("not logout")
    //     }
    // }
    // catch (error) {
    //     console.error(error)
    // }
    window.location.href = "login.html"
})
