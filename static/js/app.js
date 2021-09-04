// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {

  tbody.html("");

  data.forEach((dataRow) => {
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell 
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

var filters = {}


function filterTable() {
  
  let filteredData = tableData;
  // Loop through all of the filters and keep data that
  // matches the filter values
  Object.entries(filters).forEach(function([key,value]){
    filteredData = filteredData.filter((row) => row[key] === value);
  })

  // Rebuild the table using the filtered data
  buildTable(filteredData)
}

function updateFilters() {

  // Save the element, values and ids that were changed as variables
  var changeElem = d3.select(this).select("input");
  
  var elemValue = changeElem.property("value");
  
  var filterId = changeElem.attr("id");

    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
  if (elemValue) {
    filters[filterId] = elemValue;
  }
  else {
    delete filters[filterId]
  }

    filterTable();
  
  }

  // Attach an event to listen for changes to each filter
  d3.selectAll(".list-group-item").on("change", updateFilters)
  
  // Build the table when the page loads
  buildTable(tableData);
