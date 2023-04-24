const BASE_URL = 'https://restcountries.com/v3.1/name';
const INFO_COUNTRIES = "fields=name,capital,population,flags,languages"
 function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/${name}?${INFO_COUNTRIES}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export {fetchCountries};