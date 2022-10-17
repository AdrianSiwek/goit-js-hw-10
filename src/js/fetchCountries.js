const COUNTRIES_API_URL = 'https://restcountries.com/#api-endpoints-v3-name';

const fetchCountries = (designation) => {
    fetch(`${COUNTRIES_API_URL}${designation}?fields = name, capital, population, flags, languages`).then((response) => response.json);
}

export { fetchCountries };