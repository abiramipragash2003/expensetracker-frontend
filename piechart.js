
fetchData(`${url}/type/income`)

async function fetchData(apiUrl) {

  try {
      console.log(`Bearer ${token}`)
      const pieresponse = await fetch(apiUrl, {
          method: 'GET',
          headers:
          {
              'Authorization': `Bearer ${token}`
          }

      });

      if (!pieresponse.ok) {
          throw new Error('Failed to fetch data');
      }
      const piedata = await pieresponse.json();
     
      console.log(piedata)
   
          
      }
  
  catch (error) {
      console.error(error)
  }
}





// Sample data for the pie chart
const data = [10,10]; // Each value represents the size of a partition

// Function to round a number to two decimal places
function roundToTwoDecimalPlaces(num){
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Function to draw the pie chart
function drawPieChart(data) {
  const svg = document.getElementById('pieChart');
  const center = { x: 10, y: 10 }; // Center of the pie chart
  let startAngle = 0;

  // Calculate total value
  const total = data.reduce((acc, val) => acc + val, 0);

  // Scale the values so that they sum up to 100
  const scaledData = data.map(value => roundToTwoDecimalPlaces((value / total) * 100));
  console.log(scaledData); 
  // Loop through data to create slices
  var i=0;
  var sum=0;
  scaledData.forEach(value => {
    sum=sum+value
    const sliceAngle = (value / 100) * 360;
    const endAngle = startAngle + sliceAngle;

    const startX = center.x + Math.cos(startAngle * Math.PI / 180) * 150;
    const startY = center.y + Math.sin(startAngle * Math.PI / 180) * 150;
    const endX = center.x + Math.cos(endAngle * Math.PI / 180) * 150;
    const endY = center.y + Math.sin(endAngle * Math.PI / 180) * 150;

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    const pathData = `M${center.x},${center.y} L${startX},${startY} A150,150 0 ${largeArcFlag},1 ${endX},${endY} Z`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', getColors(i));
    
    // Calculate midpoint for placing text
    const midAngle = startAngle + (sliceAngle / 2);
    const midX = center.x + Math.cos(midAngle * Math.PI / 180) * 170; // Adjust distance to move text outside
    const midY = center.y + Math.sin(midAngle * Math.PI / 180) * 170; // Adjust distance to move text outside

    // Create text element for displaying value
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midX); // Set x coordinate
    text.setAttribute('y', midY); // Set y coordinate
    text.setAttribute('text-anchor', 'middle'); // Set text-anchor to middle
    text.setAttribute('alignment-baseline', 'middle'); // Set alignment-baseline to middle
    text.setAttribute('fill', '#ffffff'); // Set text color to white
    text.textContent = value; // Set text content
    
    svg.querySelector('g').append(path, text);
    startAngle = endAngle;
    i++
  });
  i=0;
  console.log(sum)
}

// Function to generate random colors
function getColors(i)
{
    const colors=["#4d8ecc","#5a97d5","#67a1de","#73abe7","#80b5f0","#8dbff9","#9ac8ff","#a6d2ff","#b3dcff","#c0e6ff","#daf9ff","#e7ffff"]
    return colors[i]
}

// Call the drawPieChart function with scaled data
drawPieChart(data);