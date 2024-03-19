// const pieInfo=["beauty","food","education"] //100+1000+10=1100 ( 100/1110) * 100 / 360 => (a/b)*360
// const data=[100,1000,10]


// Function to round a number to two decimal places
function roundToTwoDecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Function to draw the pie chart
function drawReportPieChart(data, pieInfo, pieChart) {
  const svg = pieChart
  const center = { x: -30, y: -30 }; // Center of the pie chart
  let startAngle = 0;
  if (data.length === 1) {
    data = [100];
  }

  // Calculate total value
  const total = data.reduce((acc, val) => acc + val, 0);

  // Scale the values so that they sum up to 100
  const scaledData = data.map(value => roundToTwoDecimalPlaces((value / total) * 100));
  console.log(`scaledData ${scaledData}`);
  // Loop through data to create slices
  var i = 0;
  var sum = 0;
  scaledData.forEach(value => {
    sum = sum + value
    const sliceAngle = (value / 100) * 360;
    const endAngle = startAngle + sliceAngle;

    const startX = center.x + Math.cos(startAngle * Math.PI / 180) * 80;//150-->radius
    const startY = center.y + Math.sin(startAngle * Math.PI / 180) * 80;
    const endX = center.x + Math.cos(endAngle * Math.PI / 180) * 80;
    const endY = center.y + Math.sin(endAngle * Math.PI / 180) * 80;

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    let pathData;
    
    
      pathData = `M${center.x},${center.y} L${startX},${startY} A80,80 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    
    //the starting point of the path, specified using the 'M' command
    //straight line segment specified using the 'L' command

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', getColors(i));

    // Calculate midpoint for placing text
    const midAngle = startAngle + (sliceAngle / 2);
    const midX = center.x + Math.cos(midAngle * Math.PI / 180) * 160; // Adjust distance to move text outside
    const midY = center.y + Math.sin(midAngle * Math.PI / 180) * 110; // Adjust distance to move text outside

    // Create text element for displaying value
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midX); // Set x coordinate
    text.setAttribute('y', midY); // Set y coordinate
    text.setAttribute('text-anchor', 'middle'); // Set text-anchor to middle
    text.setAttribute('alignment-baseline', 'middle'); // Set alignment-baseline to middle
    text.setAttribute('fill', getColors(i)); // Set text color to white
    text.textContent = `${value}% ${pieInfo[i]}`; // Set text content
    if (value) {
      svg.querySelector('g').append(path, text);
      startAngle = endAngle;
    }

    i++
  });
  i = 0;
  console.log(sum)
}

// Function to generate random colors
function getColors(i) {
  const colors = ["#4d8ecc", "#5a97d5", "#67a1de", "#73abe7", "#80b5f0", "#8dbff9", "#9ac8ff", "#a6d2ff", "#b3dcff", "#c0e6ff", "#daf9ff", "#e7ffff", "#e8ffff"]
  return colors[i]
}
