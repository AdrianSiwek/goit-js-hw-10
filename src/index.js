import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const inputCountry = document.querySelector('input#search-box');
const ulCountry = document.querySelector('country-list');
const divCountry = document.querySelector('country-info');

const DEBOUNCE_DELAY = 300;
