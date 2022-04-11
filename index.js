function searchZip() {
  let appId = "bcc8b91f331931f64db653552ba2239f";

  let zipCode = document.querySelector("input").value;
  let countryCode = "US";

  let zipOutput = fetch(
    `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${appId}`
  )
    .then((response) => response.json())
    .then((zipJson) => {
      console.log(`dawg`);
      console.log(zipJson);

      let lat = zipJson.lat;
      let long = zipJson.lon;

      let response = fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&units=imperial&appid=${appId}`
      )
        .then((response) => response.json())
        .then((weatherJson) => {
          console.log(weatherJson);

          let tempInFar = Math.round(weatherJson.current.temp);
          document.querySelector(".temp").innerHTML = `${tempInFar}°F`;
          let city = zipJson.name;
          document.querySelector(".location").innerHTML = `${city}`;
          let description = weatherJson.current.weather[0].description;
          document.querySelector(".conditions").innerHTML = `${description}`;
          //   let date = new Date().toDateString();
          //   document.querySelector(".date").innerHTML = `${date}`;

          const dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
          };
          let dateDate = new Date().toLocaleDateString("en-US", dateOptions);
          console.log(dateDate);
          document.querySelector(".date").innerHTML = dateDate;

          let low = Math.round(weatherJson.daily[0].temp.min);
          document.querySelector(".low").innerHTML = `Low: ${low}`;

          let high = Math.round(weatherJson.daily[0].temp.max);
          document.querySelector(".high").innerHTML = `High: ${high}`;

          let humidityInput = weatherJson.current.humidity;
          document.querySelector(
            ".humidity"
          ).innerHTML = `Humidity: ${humidityInput}`;

          let windInput = Math.round(weatherJson.current.wind_speed);
          document.querySelector(
            ".wind"
          ).innerHTML = `Wind Speed: ${windInput}mph`;

          document.querySelector(".current").classList.add("visible");

          //   Tomorrow

          let tomorrowConditions = weatherJson.daily[0].weather[0].main;
          document.querySelector(
            ".tomConditions"
          ).innerHTML = `${tomorrowConditions}`;
          let tomHi = Math.round(weatherJson.daily[0].temp.min);
          document.querySelector(".tomHi").innerHTML = `High: ${tomHi} / `;
          let tomLow = Math.round(weatherJson.daily[0].temp.max);
          document.querySelector(".tomLow").innerHTML = `Low: ${tomLow}`;

          // Two Days

          let twoDayConditions = weatherJson.daily[1].weather[0].main;
          document.querySelector(
            ".twoDayConditions"
          ).innerHTML = `${twoDayConditions}`;
          let twoDayHi = Math.round(weatherJson.daily[1].temp.min);
          document.querySelector(".twoDayHi").innerHTML = `High: ${twoDayHi} / `;
          let twoDayLow = Math.round(weatherJson.daily[1].temp.max);
          document.querySelector(".twoDayLow").innerHTML = `Low: ${twoDayLow}`;

          // Three Days

          let threeDayConditions = weatherJson.daily[2].weather[0].main;
          document.querySelector(
            ".threeDayConditions"
          ).innerHTML = `${threeDayConditions}`;
          let threeDayHi = Math.round(weatherJson.daily[2].temp.min);
          document.querySelector(".threeDayHi").innerHTML = `High: ${threeDayHi} / `;
          let threeDayLow = Math.round(weatherJson.daily[2].temp.max);
          document.querySelector(".threeDayLow").innerHTML = `Low: ${threeDayLow}`;

          document.querySelector(".future").classList.add("visible");

          document.querySelector(".tom").classList.add("visible");
          document.querySelector(".twoDays").classList.add("visible");
          document.querySelector(".threeDays").classList.add("visible");

          // Icons

          let todayIcon = weatherJson.current.weather[0].icon;
          let tomorrowIcon = weatherJson.daily[1].weather[0].icon;
          let twoDayIcon = weatherJson.daily[1].weather[0].icon;
          let threeDayIcon = weatherJson.daily[1].weather[0].icon;


          document.querySelector(".todayIcon").src=`https://openweathermap.org/img/wn/${todayIcon}.png`;
          document.querySelector(".tomIcon").src=`https://openweathermap.org/img/wn/${tomorrowIcon}.png`;
          document.querySelector(".twoDayIcon").src=`https://openweathermap.org/img/wn/${twoDayIcon}.png`;
          document.querySelector(".threeDayIcon").src=`https://openweathermap.org/img/wn/${threeDayIcon}.png`;



        });
    });
}

document
  .querySelector(".searchButton")
  .addEventListener("click", function (event) {
    console.log(`doxxed eeeee`);
    event.preventDefault();
    searchZip();
  });
