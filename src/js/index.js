import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import  debounce  from 'lodash.debounce'

const serchCounties = document.getElementById("search-box");
const countriesList = document.querySelector(".country-list")
const countriesInfo = document.querySelector(".country-info")

const DEBOUNCE_DELAY = 300;


serchCounties.addEventListener("input", debounce(searchCountiesName, DEBOUNCE_DELAY));

function searchCountiesName(event) {
    const inputValue = event.target.value.trim();
    cleanHtml();
    if (inputValue !== '') {
      fetchCountries(inputValue)
        .then(country => {
          if (country.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (country.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          } else if (country.length >= 2 && country.length <= 10) {
            renderCountryList(country);
          } else if (country.length === 1) {
            createCounriesInfo(country);
          }
        })
        .catch(err => {
          if (err.message === '404') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          }
        });
    }
  }


function createCounriesInfo (country){
    const markup = country.map((country) => {
        return `
        <img src="${country.flags.svg}" alt="${country.name.official}" width="90" hight="60">
        <h2>${country.name.official}</h2>
        <ul>
        <li>Capital : ${country.capital}</li>
        <li>Population : ${country.population}</li>
        <li>Languages : ${Object.values(country.languages)}</li>
        </ul>
       `
    }
    ).join('');
    countriesInfo.innerHTML +=markup
}
function renderCountryList(country) {
    const markup = country
      .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="60" hight="30">
           <h3>${country.name.official}</h3>
                  </li>`;
      })
      .join('');
      countriesList.innerHTML = markup;
  }

function showError(err) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }

  function cleanHtml() {
    countriesList.innerHTML = '';
    countriesInfo.innerHTML = '';
  }
console.log(countriesInfo.value)