/* Dom */
const button = document.querySelector(".bx-search");
const img = document.querySelector(".infos-img");
const input = document.querySelector("input");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humidity .text h4");
const wind = document.querySelector(".windspeed .text h4");
const container = document.querySelector(".container");
const infos = document.querySelector(".infos");
const extraInfos = document.querySelector(".extraInfos");
const bar = document.querySelector(".searchBar");

/* Weather Arrays*/ 
const sun = ["Sunny"];
const cloud = ["Partly cloudy","Cloudy","Overcast"];
const cloud2 = ["Mist","Fog"];
const rain = ["Patchy rain possible","Patchy light rain","Light rain","Moderate rain at times","Moderate rain","Heavy rain","Moderate or heavy freezing rain","Light rain shower","Moderate or heavy rain shower","Torrential rain shower"];
const snow = ["Patchy snow possible","Blowing snow","Patchy freezing drizzle possible","Blizzard","Freezing fog","Patchy light drizzle",
  "Light drizzle","Freezing drizzle","Heavy freezing drizzle","Light sleet","Moderate or heavy showers of ice pellets",
  "Light showers of ice pellets","Moderate or heavy snow showers","Light snow showers","Moderate or heavy sleet showers",
  "Light sleet showers","Moderate or heavy sleet","Patchy light snow","Light snow","Moderate snow","Patchy heavy snow",
  "Heavy snow","Ice pellets"];
const thunder = ["Thundery outbreaks possible","Patchy light rain with thunder","Moderate or heavy rain with thunder","Patchy light snow with thunder","Moderate or heavy snow with thunder"];

/* Functions */
button.addEventListener("click", () => {
  const key = `http://api.weatherapi.com/v1/current.json?key=456be90c71f74254ae4183725241001&q=${input.value}&aqi=no`;

  fetch(key)
    .then(response => {
      if (!response.ok) {
        ErrorResponse();
      } else {
        response.json()
          .then(data => {
            Weather(data);
          })
      }
    })
});

function ErrorResponse() {
  extraInfos.style.visibility = "hidden";
  extraInfos.style.opacity = "0";
  img.src = "404.png";
  img.style.transform = "scale(1)";
  bar.style.transform = "translateY(0)";
  container.style.height = "500px";
  temp.innerHTML = "City Not Found";
  condition.innerHTML = "";
  setTimeout(transitions, 600);

  function transitions() {
    infos.style.visibility = "visible";
    infos.style.opacity = "1";
  }
}

function Weather(data) {
  temp.innerHTML = `${data.current.temp_c}°C`;
  condition.innerHTML = data.current.condition.text;
  wind.innerHTML = `${data.current.wind_kph}kph`;
  humidity.innerHTML = data.current.humidity;


  icons(cloud, data, img);
  icons(cloud2, data, img);
  icons(rain, data, img);
  icons(thunder, data, img);
  icons(sun, data, img);
  icons(snow, data, img);
}

function icons(array, data, img) {
  if (array.some(elem => elem === data.current.condition.text)) {
    if (array === sun) {
      img.src = "sun.svg";
    } else if (array === cloud) {
      img.src = "cloud.svg";
    } else if (array === rain) {
      img.src = "cloud-showers-heavy.svg";
    } else if (array === cloud2) {
      img.src = "smog.svg";
    } else if (array === snow) {
      img.src = "snowflake.svg";
    } else if (array === thunder) {
      img.src = "cloud-bolt.svg";
    }
  }

  img.style.transform = "scale(1)";
  bar.style.transform = "translateY(0)";
  container.style.height = "500px";
  setTimeout(transitions, 600);

  function transitions() {
    infos.style.visibility = "visible";
    extraInfos.style.visibility = "visible";
    infos.style.opacity = "1";
    extraInfos.style.opacity = "1";
  }
}
