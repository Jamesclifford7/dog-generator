function getValue() {
    const currentValue = $('.generate-form input').val();
    return currentValue;
} 

function getDogImage() {
    fetch(`https://dog.ceo/api/breeds/image/random/${getValue()}`)
        .then(function(response){
            return response.json()
        })
        // .then(responseJson => console.log(responseJson))
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Oops! Something is wrong, please try again later'));
} 


function displayResults(responseJson) {
    // why doesn't '.html' work for this, but '.replaceWith' does?
    for (i = 0; i < responseJson.message.length; i++) {
        $('.results').append(`<img class="results-image" src=${responseJson.message[i]} width=400 height=autp>`);
    }
    $('.results').removeClass('hidden');
} 

function clearResults() {
    $('.clear-button').on('click', function(event) {
        $('.results-image').remove()
    });
}

// clearResults();

function watchFirstForm() {
    $('.generate-form').on('submit', function(event){
        event.preventDefault();
        getDogImage();
    })
} 

// watchFirstForm();

/* --------------------------- */

function getBreedValue() {
    const currentBreedValue = $('.generate-breed-form input').val();
    return currentBreedValue;
}

function getBreedImage() {
    fetch(`https://dog.ceo/api/breed/${getBreedValue()}/images/random`)
        .then(function(response) {
            return response.json()
        })
        .then(function(responseJson) {
            displayBreedResults(responseJson)
        })
        .catch(error => alert('Oops! Please enter the name of a dog breed'));
}

function displayBreedResults(responseJson) {
    $('.breed-results').append(`<img class="breed-results-image" src="${responseJson.message}" width=400 height=auto>`);
    $('.breed-results').removeClass('hidden');
}

function clearBreedResults() {
    $('.clear-breeds-button').on('click', function(event) {
        $('.breed-results-image').remove();
    });
}

// clearBreedResults();

function watchSecondForm() {
    $('.generate-breed-form').on('submit', function(event){
        event.preventDefault();
        getBreedImage();
    })
}

// watchSecondForm();

function handleApp() {
    clearResults();
    watchFirstForm();
    clearBreedResults();
    watchSecondForm();
}

handleApp();