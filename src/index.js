import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';


const DEBOUNCE_DELAY = 300;
const inputCountry = document.getElementById('search-box');
const ulCountry = document.getElementsByClassName('country-list');

const createCountryInfo = country => {
    const li = document.createElement('li');
    li.innerHTML = `<img src=${country.flags.svg} /><p class="country-name">${country.name.official}</p><ul><li><p class="country-list">Population: ${country.population}</p></li><li><p class="country-list">Capital city: ${country.capital}</p></li><li><p class="country-list">Languages: ${Object.values(country.languages).join(', ')}</p></li></ul>`
    ulCountry[0].append(li);
};

const createInfoMarkup = (data) => {
    return data.map(({ name, flags }) =>
        `<a href="http://wikipedia.org/wiki/${name.common}" target="_blank"><li class="li-item" data-name="${name.common}"><img src="${flags.svg}" alt="${name.common}"/>${name.common}</li></a>`
    )
        .join('');
};

const removeCountry = () => {
    let element = document.querySelector('ul')
    while (element.firstChild) element.removeChild(element.firstChild);
}

    
const onFetchCountries = async event => {
    let value = event.target.value.trim();
    if (value !== '') {
        const countriesResp = await fetchCountries(value);
        if (countriesResp.status === 200) {
            const countries = await countriesResp.json();
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
            } else if (countries.length === 1) {
                removeCountry();
                countries.forEach(country => createCountryInfo(country));
            } else if (countries.length >= 2 && countries.length <= 10) {
                ulCountry[0].innerHTML = createInfoMarkup(countries);
            }
        } else if (countriesResp.status === 404) {
            Notify.warning("Oops, there is no country with that name");
        }
    }
    if(value === '') {
        removeCountry();
    }
}






inputCountry.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

