// Getting the container for the breweries and create a search input element
const breweriesContainer = document.getElementById('breweries-container');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'search-input';
searchInput.classList.add('form-control');
searchInput.placeholder = 'Search breweries...';

// Function to fetch the brewery data from the API
async function fetchBreweries() {
  try {
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const data = await response.json();
    return data;
  } catch (error) {
    alert.error(error);
  }
}

// Function to display the breweries in the container
function displayBreweries(breweries) {
  // Clearing the container first
  breweriesContainer.innerHTML = '';

  // Filter the breweries based on the search text
  const searchText = searchInput.value.trim().toLowerCase();
  const filteredBreweries = [];
  for (let i = 0; i < breweries.length; i++) {
    const brewery = breweries[i];
    if (brewery.name.toLowerCase().includes(searchText)) {
      filteredBreweries.push(brewery);
    }
  }

  // Sort the filtered breweries alphabetically by name
  filteredBreweries.sort((a, b) => a.name.localeCompare(b.name));

  // Creating a card for each brewery and add it to the container
  if (filteredBreweries.length > 0) {
    for (let i = 0; i < filteredBreweries.length; i++) {
      const brewery = filteredBreweries[i];
      const card = document.createElement('div');
      card.classList.add('card', 'my-3');
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const breweryName = document.createElement('h5');
      breweryName.classList.add('card-title');
      breweryName.textContent = `Name: ${brewery.name}`;
      const breweryType = document.createElement('h6');
      breweryType.classList.add('card-subtitle', 'mb-2', 'text-muted');
      breweryType.textContent =`Type: ${brewery.brewery_type}` ;
      const breweryAddress = document.createElement('p');
      breweryAddress.classList.add('card-text');
      breweryAddress.innerHTML = `<i class="fa fa-address-book" aria-hidden="true"></i> Address: ${brewery.street}<br>${brewery.city}, ${brewery.state} ${brewery.postal_code}`;//used Font Awesome 4.7.0
      const breweryWebsite = document.createElement('a');
      breweryWebsite.classList.add('card-link');
      breweryWebsite.href = brewery.website_url;
      breweryWebsite.target = '_blank';
      breweryWebsite.rel = 'noopener noreferrer';
      breweryWebsite.textContent = `Website: ${brewery.website_url}`;
      const breweryPhone = document.createElement('p');
      breweryPhone.classList.add('card-text');
      breweryPhone.textContent = `Phone No: ${brewery.phone}`;
      cardBody.appendChild(breweryName);
      cardBody.appendChild(breweryType);
      cardBody.appendChild(breweryAddress);
      cardBody.appendChild(breweryWebsite);
      cardBody.appendChild(breweryPhone);
      card.appendChild(cardBody);
      breweriesContainer.appendChild(card);
    }
  } else {
    // If no breweries match the search text, display a message
    const noResults = document.createElement('p');
    noResults.textContent = 'No results found.';
    breweriesContainer.appendChild(noResults);
  }
}

  // Add an event listener to the search input that updates the display when the user types
  searchInput.addEventListener('input', () => {
    displayBreweries(breweries);
  });

  // Main function that runs when the page loads
  async function main() {
    // Fetch the breweries and display them
    const breweries = await fetchBreweries();
    displayBreweries(breweries);

    // Creating a search form and add it to the page
    const searchForm = document.createElement('form');
    searchForm.classList.add('d-flex', 'justify-content-center', 'my-4');
    const searchFormGroup = document.createElement('div');
    searchFormGroup.classList.add('form-group');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Search';

    // adding search input and submit button to form
    searchFormGroup.appendChild(searchInput);
    searchFormGroup.appendChild(submitButton);
    searchForm.appendChild(searchFormGroup);

    // inserting search form before breweries container
    document.body.insertBefore(searchForm, breweriesContainer);
  }

// calling the main function to fetch and display breweries and create search form
  main();