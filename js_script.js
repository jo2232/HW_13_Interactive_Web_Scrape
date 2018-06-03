// json
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search-button");

let parameters = {
  columns : [
    {
      title: 'Date/Time',
      html: function (row) { return row.datetime; }
    },
    {
      title: 'City',
      html: function (row) { return row.city; }
    },
    {
      title: 'State',
      html: function (row) { return row.state;  }
    },
    {
      title: 'Country',
      html: function (row) { return row.country;  }
    },
    {
      title: 'Shape',
      html: function (row) { return row.shape;  }
    },
    {
      title: 'Duration',
      html: function (row) { return row.durationMinutes;  }
    },
    {
      title: 'Comments',
      html: function (row) { return row.comments;  }
    }

  ],
  data: null,
  filtered_data: null
};

let myD3 = d3.select('#my-d3');

// function renderSearchTable() {
//   $tbody.innerHTML = "";
//   for (var i = 0; i < filteredDateTime.length; i++) {
//     // Get get the current address object and its fields
//     var dateTime = filteredDateTime[i];
//     var fields = Object.keys(datetime);
//     // Create a new row in the tbody, set the index to be i + startingIndex
//     var $row = $tbody.insertRow(i);
//     for (var j = 0; j < fields.length; j++) {
//       // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
//       var field = fields[j];
//       var $cell = $row.insertCell(j);
//       $cell.innerText = address[field];
//     }
//   }
// }
function init(dataSet) {
  parameters.data = dataSet;
  // parameters.filtered_data = [];
  loadUFO(parameters.data);
}

init(dataSet)

$searchBtn.addEventListener("click", handleSearchButtonClick);

function handleSearchButtonClick(event) {
  event.preventDefault();
  let selectValue = d3.select("#search-input").node().value;
  console.log(selectValue);
  parameters.filtered_data = [];
  for (let row of parameters.data) {
    console.log(row.datetime)
    if (selectValue === '') {
      parameters.filtered_data.push(row);
    }
    else if (row.datetime === selectValue) {
      parameters.filtered_data.push(row);
    }
  }
  createTables(parameters.filtered_data);
}




function loadUFO(dataSet) {
  parameters.data = dataSet;
  // console.log(parameters.data)
  // parameters.filtered_data = [];
  // for (let row of parameters.data) {
  //     if (row.state === state_search) {
  //         parameters.filtered_data.push(row);
  //     }
  //     else parameters.data
  // }
  createTables(parameters.data);
}

function createTables(ufoData) {
  myD3.html('');
  let table = d3.select('#my-d3').append('table').attr('class', 'table');
  // parameters.data = dataSet
  table.append('thead').append('tr')
    .selectAll('th')
    .data(parameters['columns'])
    .enter()
    .append('th')
    .text(function (data) { return data.title; });

  table.append('tbody')
    .selectAll('tr') // create row for each row of data
    .data(ufoData)
    .enter()
    .append('tr')
    .selectAll('td')
    .data(function (row) {
      // evaluate column objects against the current row
      return parameters.columns.map(function (column) {
        var cell = {};
        d3.keys(column).forEach(function (k) {
          if (typeof (column[k]) === 'function') {
            cell[k] = column[k](row)
          }
        });
        return cell;
      });
    }).enter()
    .append('td')
    .text(function (data) { return data.html; });

}
