const main = document.querySelector(".main");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-input");
const themeChanger = document.querySelector(".themeChanger");
const darkLight = document.querySelector(".dark-light");


function renderCountries(data) {
  main.innerHTML = ''
  data.forEach((country) => {
    // console.log(country);

    const mainContainer = document.createElement("a");
    mainContainer.classList = "main-container";
    main.append(mainContainer);
    mainContainer.href = `./country.html?name=${country.name.common}`;

    mainContainer.innerHTML = `
          <img class="image" src="${country.flags.svg}" alt="${
      country.name.common
    }">
          <div class="box">
              <h3 class="h3-main">${country.name.common}</h3>
              <p><span>Population: </span>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><span>Region: </span>${country.region}</p>
              <p><span>Capital: </span>${country.capital?.[0]}</p>
          </div>
  `;
  });
}

let allCountriesData

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data)=>{
    renderCountries(data)
    allCountriesData = data
  });

filterByRegion.addEventListener("change", (e) => {
  console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderCountries)
});

searchInput.addEventListener('input',(e)=>{
    console.log(e.target.value);
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})


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

