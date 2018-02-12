var $tbody = document.querySelector("tbody");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");
var $dateInput = document.querySelector("#dateValue");
var $cityInput = document.querySelector("#cityValue");
var $stateInput = document.querySelector("#stateValue");
var $countryInput = document.querySelector("#countryValue");
var $shapeInput = document.querySelector("#shapeValue");


$loadMoreBtn.addEventListener("click", handleLoadMoreDataClick);
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 50;

var filteredDataSet = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTableSection() {
  // Set the value of endingIndex to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the addressData array to render
  var dataSubset = filteredDataSet.slice(startingIndex, endingIndex);
  for (var i = 0; i < dataSubset.length; i++) {
    // Get get the current address object and its fields
    var rowData = dataSubset[i];
    var fields = Object.keys(rowData);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = rowData[field];
    }
  }
  // Done
  console.log("Done rendering table")
}

function handleLoadMoreDataClick() {
  // Increase startingIndex by 100 and render the next section of the table
  startingIndex += resultsPerPage;
  renderTableSection();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= filteredDataSet.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Addresses Loaded";
    $loadMoreBtn.removeEventListener("click", handleLoadMoreDataClick);
  }
}

function handleSearchButtonClick() {
  event.preventDefault();
  // Get all inputs given by the user
  var filterDate = $dateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  var filteredvalues = dataSet.filter(function (dataRow) {
    // get all fields for the row
    var date = dataRow.datetime.toLowerCase();
    var city = dataRow.city.toLowerCase();
    var state = dataRow.state.toLowerCase();
    var country = dataRow.country.toLowerCase();
    var shape = dataRow.shape.toLowerCase();

    
    // check if date is same as filterDate. If yes then do nothing otherwise return false
    if (filterDate != "" && filterDate == date) {
    } else if (filterDate != "") {
      return false;
    }

    // check if city is same as filterCity. If yes then do nothing otherwise return false
    if (filterCity != "" && filterCity == city) {
    } else if (filterCity != "") {
      return false;
    }

    // check if state is same as filterState. If yes then do nothing otherwise return false
    if (filterState != "" && filterState == state) {
    } else if (filterState != "") {
      return false;
    }

    // check if country is same as filterCountry. If yes then do nothing otherwise return false
    if (filterCountry != "" && filterCountry == country) {
    } else if (filterCountry != "") {
      return false;
    }

    // check if shape is same as filterShape. If yes then do nothing otherwise return false
    if (filterShape != "" && filterShape == shape) {
    } else if (filterShape != "") {
      return false;
    }

    // All filters matching
    return true
  });
  if (filteredvalues.length == 0) {
    console.log("No matching data found");
  }
  filteredDataSet = filteredvalues;
  $tbody.innerHTML = "";
  startingIndex = 0;
  renderTableSection();
}

renderTableSection();
