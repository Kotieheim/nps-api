'use strict';




const searchUrl = 'https://api.nps.gov/api/v1/parks';
const apiKey = 'DkZf3BaYDWFsb4tZ0AiIqCzWeDOp8xGJ7PAK9LrU';

function noResultText() {
  $('js-error-message').html(`<h2>not a result</h2>`)
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  function displayResults(responseJson) {
    console.log(responseJson)
    let noResult = noResultText();
    $('#results-list').empty();
    if (responseJson.data.length === 0) {
      $('#results-list').append(`<p style="color:red;">No results were found, try agian!</p>`);
    };
    for (let i=0; i<responseJson.data.length; i++) {
      $('#results-list').append(`
        <li><h3>${responseJson.data[i].fullName}</h3>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].directionsInfo}</p>
        </li>
        `)
    };
    $('#results').removeClass('hidden');
  }
  
  function getNationalParkInfo(query,limit=10) {
    const params = {
      api_key: apiKey,
      stateCode: query,
      limit: limit,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const limit = $('#js-max-results').val();
      getNationalParkInfo(searchTerm,limit);
    });
  }
  
  $(watchForm);