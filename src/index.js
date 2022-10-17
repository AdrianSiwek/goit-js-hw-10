import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const inputCountry = document.querySelector('input#search-box');
const ulCountry = document.querySelector('country-list');
const divCountry = document.querySelector('country-info');

const DEBOUNCE_DELAY = 300;

const onFetchCountries = async (event) => {
    const countriesResp = await fetchCountries(event.target.value);
    // console.log(countries.status);
    if (countriesResp.status === 404) {
        Notiflix.warning("Oops, there is no country with that name");
    }
}

inputCountry.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

console.log(123);
