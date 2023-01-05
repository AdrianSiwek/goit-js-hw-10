const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/';

const fetchCountries = (name) => {
    // console.log(name);
    return fetch(`${COUNTRIES_API_URL}/name/${name}?fields=name,capital,population,flags,languages`)
        // .then((response)=>response);
};

export { fetchCountries };