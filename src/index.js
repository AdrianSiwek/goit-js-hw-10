import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const inputCountry = document.querySelector('input#search-box');
const ulCountry = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


const createCountryInfo = country => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="inormation-container"><img src=${country.flags.svg} /><p class="country-name">${country.name.official}</p><ul><li><p class="country-info">Population: ${country.population}</p></li><li><p class="country-info">Capital city: ${country.capital}</p></li><li><p class="country-info">Languages: ${Object.values(country.languages).join(', ')}</p></li></ul></div>`
    ulCountry[0].append(li);
};

function createInfoMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<a href="http://wikipedia.org/wiki/${name.common}" target="_blank"><li class="list-item" data-name="${name.common}"><img src="${flags.svg}" alt="${name.common}"/>${name.common}</li></a>`
    )
    .join('');
}

const removeCountry = () => {
    while (ulCountry.firstChild) ulCountry.removeChild(ulCountry.firstChild);
}

const onFetchCountries = async (event) => {
    const countriesResp = await fetchCountries(event.target.value.trim());
    const countries = await countriesResp.json();
    console.log(countries);
    if (countriesResp.status === 404) {
        Notify.warning("Oops, there is no country with that name");
    } else if (countriesResp.status === 200) {
        if (countries && countries.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (countries && countries.length === 1) {
            removeCountry();
            countries.forEach(country => createCountryInfo(country));
        } else if (countries && countries.length >= 2 && countries.length <= 10) {
            ulCountry[0].textContent = createInfoMarkup(countries);
        }
    }
    if (event.target.value.trim() === '') {
        removeCountry();
    }
}
    





inputCountry.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

