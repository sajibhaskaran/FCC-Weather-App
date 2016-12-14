// User Story: I can see the weather in my current location.

// User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

// User Story: I can push a button to toggle between Fahrenheit and Celsius.

$(document).ready(function() {

      var city ="";
          $.getJSON('http://ipinfo.io/json', function(data){
            //console.log( data.city);
            city = data.city+ ', '+ data.country;
            getWeather(city);

          });



  function getWeather(x){
        var city = x;
        var today = new Date();

        var temp = 0;
        var description = "";
        var wind = "";
        var windspeed = 0;

        var icon = "";
        var country = "";
        var deg = 0;
        var pressure = 0;

        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&type=accurate&APPID=13661ad5a31e7cd905896f5f27fca3ad";
        $.getJSON(url, function(data) {
          //console.log(data);

          city = data.name + ", " + data.sys.country;
          temp = parseInt(((data.main.temp - 273.15) * 9 / 5) + 32);
          description = data.weather[0].description;
          icon = data.weather[0].icon;
          var humidity = data.main.humidity + "%";
          deg = data.wind.deg;
          pressure = (data.main.pressure * 0.0295299).toFixed(2) + "in";
          wind = findDirection(deg);
          windspeed = data.wind.speed;

          var sunrise = formatTime(data.sys.sunrise);
          var sunset = formatTime(data.sys.sunset);
          $("img").attr({
            src: "http://openweathermap.org/img/w/" + icon + ".png"
          });
          $("#description").html(description);
          $("#place").html(city);
          $("#date").html(today.toDateString());
          $("#time").html(today.toLocaleTimeString());
          $("#temp").html(temp);
          $("#wind").html(windspeed + wind);
          $("#humidity").html(humidity);
          $("#pressure").html(pressure);
          $("#sunrise").html(sunrise + " AM");
          $("#sunset").html(sunset + " PM");

        }); // end of openweathermap API.
        // function to find out the wind direction.
          function findDirection(deg) {
          var directionArr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
          var value = Math.floor((deg / 22.5) + 0.5);
          return directionArr[(value % 16)];
        }
        // function to convert the UTC time.
        function formatTime(timestamb) {
          var date = new Date(timestamb * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          if (hours > 12) {
            hours = hours - 12;
          }
          var newTime = hours + ":" + minutes.substr(-2);
          return newTime;
        }

        $(".btn").click(function() {
          if ($(this).text() === "C") {
            $(this).text("F");
            $("#degree").text("\xB0" + "C");
            $("#temp").text(Math.round((temp - 32) * 5 / 9));
          } else {
            $(this).text("C");
            $("#degree").text("\xB0" + "F");
            $("#temp").text(Math.round(temp));
          }
        });
  }
});
