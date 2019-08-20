"use strict";

const apiKey = "DkZf3BaYDWFsb4tZ0AiIqCzWeDOp8xGJ7PAK9LrU";
const searchURL = "https://api.nps.gov/api/v1/parks";

function watchSubmitForm() {
  console.log("watchSumbitForm");
  $("#js-form").submit(e => {
    e.preventDefault();
    let searchState = $("#js-search-term").val();
    let numResults = $("#js-max-results").val();
    getNationalParks(searchState, numResults);
  });
}

function formatQueryParams(params) {
  console.log("formatQueryParams function");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}
function getNationalParks(query, limit = 10) {

  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something broke, try again?");
    });
}
function displayResults(responseJson) {
  console.log("displayResult function");
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").html(`
      <h3 class="panel-title">${responseJson.data[i].fullName}</h3>
     <h4 class="panel-title">${responseJson.data[i].description}</h4>
     <p>Park Results<p>
     <a href=" ${responseJson.data[i].url}">Park website</a>`);
  }
  $("#results-list").removeClass("hidden");
}

$(watchSubmitForm);