
import countryListTpl from '../templates/countries_list.hbs';
import countryInfoTpl from '../templates/country_info.hbs';
import API from "./fetchCountries";
import Notiflix from "notiflix";
import refs from "./refs.js";
const { countryList, countryInfo, searchBox } = refs;

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

searchBox.addEventListener('input', debounce(onSearchCountries,DEBOUNCE_DELAY));

function onSearchCountries(evt) {
    evt.preventDefault();

      if (!evt.target.value.trim()) {
        clearRenderCountry();
       return;
    }

    let query = evt.target.value.trim();
    API.fetchCountries(query)
        .then(renderCountry)
        .catch(onFetchError)
}

function renderCountry(country) {
    clearRenderCountry();
    if (country.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length === 1) {
        createCountryInfo(country);
        return
    } else {
        createCountryList(country);
        }
};

function createCountryInfo(country) {
    countryInfo.innerHTML = countryInfoTpl(country);
}

function createCountryList(country) {
    countryList.innerHTML = countryListTpl(country);
}

function clearRenderCountry() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');   
};