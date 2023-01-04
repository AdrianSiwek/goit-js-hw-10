import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const inputCountry = document.querySelector('input#search-box');
const ulCountry = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.common}" width="40" height="30"/>${name.common}</li>`
    )
    .join('');
}

const onFetchCountries = async (event) => {
    const countriesResp = await fetchCountries(event.target.value.trim());
    const countries = await countriesResp.json();
    console.log(countries);
    if (countriesResp.status === 404) {
        Notify.warning("Oops, there is no country with that name");
    } else if (countriesResp.status === 200) {
        if (countries.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
        }
    }
}
    





inputCountry.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

console.log(123);
