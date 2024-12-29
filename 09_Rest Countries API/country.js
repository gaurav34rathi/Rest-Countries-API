const countryName = new URLSearchParams(window.location.search).get("name");
const img = document.querySelector(".image");
const h2 = document.querySelector(".h2");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const darkLight = document.querySelector('.dark-light')
const themeChanger = document.querySelector('.theme-changer')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0]);
    img.src = data[0].flags.svg;
    h2.innerText = countryName;

    if (data[0].name.nativeName) {
      nativeName.innerText = Object.values(data[0].name.nativeName)[0].common;
    } else {
      nativeName.innerText = data[0].name.common;
    }
    //   if (data[0].capital) {
    //     capital.innerText = data[0].capital?.[0]
    //   }
    population.innerText = data[0].population;
    region.innerText = data[0].region;
    subRegion.innerText = data[0].subregion;
    capital.innerText = data[0].capital;
    topLevelDomain.innerText = data[0].tld;

    if (data[0].currencies) {
      currencies.innerText = Object.values(data[0].currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (data[0].languages) {
      languages.innerText = Object.values(data[0].languages).join(", ");
    }

    if (data[0].borders) {
      data[0].borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            console.log(borderCountry);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });

  themeChanger.addEventListener('click', () => {
  
    if(localStorage.getItem('darkLights')=='Light'){
      localStorage.setItem('darkLights','dark')
      document.body.classList= 'dark'
      darkLight.innerText = `Light Mode`
    }else{
      localStorage.setItem('darkLights','Light')
      document.body.classList= ''
      darkLight.innerText = `Dark Mode`
    }
  })
  const myData = localStorage.getItem('darkLights')
  document.body.classList= myData