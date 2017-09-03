// Portfolio Model

// define some variables
const boxWidth = 80;
const boxHeight = 50;
const padding = 10;
const margin = 20;

const svgWidth = 800;  // should pick this up from clientWidth, but seems broken in Safari
const svgHeight = 500;

var colours = { cyan: '#1FB3CF',
                lightblue: '#69A6FF',
                blue: '#0064FF',
                darkblue: '#003BC9',
                lightpurple: '#6E177D',
                darkpurple: '#000F5E',
                red: '#DB2663',
                black: '#000000',
                white: '#EAEAEA' };

// define the basic Model
// TODO this needs to come from a database
const portfolioArray = [ { id:'PRED',  desc:'Predictive analytics', row:'1', col:'0', colour:'lightpurple' },
                         { id:'BDA-P', desc:'Big data analytics', row:'1', col:'1', colour:'lightpurple' },
                         { id:'DGOV',  desc:'Data governance', row:'2', col:'0', colour:'red' },
                         { id:'DINT',  desc:'Data integration', row:'2', col:'1', colour:'red' } ];

const informationArray = [ { id:'PRED', badges: 'Badges for predictive analytics', tutorials: "Tutorials for predictive analytics"},
                           { id:'BDA-P', badges: 'Badges for big data analytics', tutorials: "Tutorials for big data analytics"},
                           { id:'DGOV', badges: 'dsfgas', tutorials: "adfgfa"},
                           { id:'DINT', badges: 'adsfga', tutorials: "asfdgaf"} ];

// define the database
const docId = "8f916fed56800f32c0c4bfa1477d2125";
const baseUrl = "https://" + user + ":" + pass + "@" + user + ".cloudant.com/" + db;
console.log(baseUrl);
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var resp = JSON.parse(xhttp.responseText);
    console.log(resp);
  }
}
xhttp.open("GET", baseUrl + "/" + docId, true);
xhttp.send();

function errorHandler(jqXHR, textStatus, errorThrown) {
	console.log("something went wrong: " + textStatus + " " + errorThrown + " " + JSON.stringify(jqXHR));
}


// $.ajax({
//   url: baseUrl + "/" + docId,
//   type: 'GET',
//   error: errorHandler
// }).done(function (data) {
//   var doc = JSON.parse(data);
//   var text = doc.text;
//   console.log("Text is: " + text);
// });

// create a text-wrapping function for the box text
wrap = d3.textwrap();
wrap
  .bounds({height:boxHeight, width:boxWidth})
  .padding(5);

// create the basic portfolio model

var groups = d3.select('svg#portfolio-model')
  .selectAll('g')            // create groups for each box and its associated text
  .data(portfolioArray)
  .enter()                   // read this code as a 'for-loop'. This now runs once for each point of data in myArray
  .append('g')               // append new groups
  .attr('class', 'box')
  .attr('transform', function (d, i) {    // move the group into position according to its row and column
    return 'translate(' + (d.col*(boxWidth+padding)+margin) + ',' + (d.row*(boxHeight+padding)+margin) +')';
  })
  .on('click', function (d, i) {
    showInformation(d);
  });

groups.append('rect')
  .attr('width', boxWidth)          // set the box size
  .attr('height', boxHeight)
  .style('fill', function (d, i) {  // set the colour
    return colours[d.colour];
  });

groups.append('text')
  .text(function (d, i) {           // set the text
    return d.desc;
  })
  .call(wrap)                       // wrap text
  ;


// handle mouse clicks

function showInformation(d) {
  d3.select('#box-name')
    .text(d.desc);
  for (var i = 0; i < informationArray.length; i++) {
    if (d.id === informationArray[i].id) {
      d3.select('#badges')
      .text(informationArray[i].badges);
      d3.select('#tutorials')
      .text(informationArray[i].tutorials);
    }
  }
}
