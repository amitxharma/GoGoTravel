import config from "../conf/index.js";

async function init() {
  try {
    // Fetches list of all cities along with their images and description
    let cities = await fetchCities();

    // Check if cities is null or empty
    if (cities === null || cities.length === 0) {
      console.error("No cities data available.");
      return;
    }

    // Updates the DOM with the cities
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

// Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`Error fetching cities: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching cities:", err);
    return null;
  }
}

// Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataelem = document.getElementById("data");
  dataelem.innerHTML += `
    <div class="col-6 col-lg-3 mb-4">
      <a href="pages/adventures/?city=${id}" id="${id}">
        <div class="tile">
          <div class="tile-text text-center">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
          <img class="img-responsive" src="${image}" />
        </div>
      </a>
    </div>
  `;
}

export { init, fetchCities, addCityToDOM };
