import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const inputCountry = document.querySelector('input#search-box');
const ulCountry = document.querySelector('.country-list');
// const divCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


const createCountryInfo = country => {
    // console.log(countriesList[0]);
    const liList = document.createElement('li');
    li.innerHTML = `<div class="full-info-container"><img src=${country.flags.svg} /><span class="country-name">${country.name.official}</span><ul><li><span class="country-info">Population: ${country.population}</span></li><li><span class="country-info">Capital city: ${country.capital}</span></li><li><span class="country-info">Languages: ${Object.values(country.languages).join(', ')}</span></li></ul></div>`
    ulCountry[0].appendChild(liList);
};

const createInfoMarkup = (data) => {
    return data.map(({ name, flags }) =>
        `<a href="http://wikipedia.org/wiki/${name.common}" target="_blank"><li class="list-item" data-name="${name.common}"><img src="${flags.svg}" alt="${name.common}"/>${name.common}</li></a>`
    )
        .join('');
};

const removeCountry = () => {
    let element = document.querySelector('ul')
    while (element.firstChild) element.removeChild(element.firstChild);
}

// const onFetchCountries = async (event) => {
//     const countriesResp = await fetchCountries(event.target.value.trim());
//     const countries = await countriesResp.json();
//     console.log(countries);
//     if (countriesResp.status === 404) {
//         Notify.warning("Oops, there is no country with that name");
//     } else if (countriesResp.status === 200) {
//         if (countries.length > 10) {
//             Notify.info("Too many matches found. Please enter a more specific name.");
//         } else if (countries.length === 1) {
//             removeCountry();
//             countries.forEach(country => createCountryInfo(country));
//         } else if (countries.length >= 2 && countries.length <= 10) {
//             ulCountry[0].innerHTML = createInfoMarkup(countries);
//         }
//     }
//     if (event.target.value.trim() === '') {
//         removeCountry();
//     }
// }
    
const onFetchCountries = async (event) => {
    let values = event.target.value.trim()
    if(values === '') {
        const countriesResp = await fetchCountries(values);
        if(countriesResp.status === 200){
            const countries = await countriesResp.json();
            if(countries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
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
    if(values === '') {
        removeCountry();
    }
}






inputCountry.addEventListener('input', debounce(onFetchCountries, DEBOUNCE_DELAY));

