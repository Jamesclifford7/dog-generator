function getValue() {
    const currentValue = $('.generate-form input').val();
    return currentValue;
} 

function getDogImage() {
    fetch(`https://dog.ceo/api/breeds/image/random/${getValue()}`)
        .then(function(response) {
            if (getValue() >=1) {
                return response.json()
            } else {
                throw new Error ('Oops! Please enter a number')
            }
        })
        .then(function(responseJson) {
            console.log(responseJson)
            return displayResults(responseJson)
        })
        .catch(function(error) {
            alert(error)
        });
} 

function displayResults(responseJson) {
    for (i = 0; i < responseJson.message.length; i++) {
        $('.results').append(`<img class="results-image" src=${responseJson.message[i]} width=400 height=autp>`);
    }
    $('.results').removeClass('hidden');
} 

function clearResults() {
    $('.clear-button').on('click', function(event) {
        $('.results-image').remove(); 
        $('#amount').val('3');
    });
}

function watchFirstForm() {
    $('.generate-form').on('submit', function(event){
        event.preventDefault();
        getDogImage();
    })
} 

/* --------------------------- */

function getBreedValue() {
    const currentBreedValue = $('.generate-breed-form input').val();
    return currentBreedValue;
}

function getBreedImage() {
    fetch(`https://dog.ceo/api/breed/${getBreedValue()}/images/random`)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                return response.json()
            } else {
                throw new Error ('Oops! Please enter the name of a dog breed')
            }
        })
        .then(function(responseJson) {
            displayBreedResults(responseJson)
        })
        .catch(function(error) {
            $('.breed-results').removeClass('hidden');
            $('.breed-results').html(`<p>${error.message}</p>`)
        });
}

function displayBreedResults(responseJson) {
    $('.breed-results').html(`<img class="breed-results-image" src="${responseJson.message}" width=400 height=auto>`);
    $('.breed-results').removeClass('hidden');
} 

function clearBreedResults() {
    $('.clear-breeds-button').on('click', function(event) {
        $('.breed-results-image').remove();
        $('#breed-name').val('');
    });
}

function watchSecondForm() {
    $('.generate-breed-form').on('submit', function(event){
        event.preventDefault();
        getBreedImage();
    })
}

function handleApp() {
    clearResults();
    watchFirstForm();
    clearBreedResults();
    watchSecondForm();
}

handleApp();