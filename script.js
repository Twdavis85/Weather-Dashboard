$(document).ready(function () {
    
    
    $(".search").on("click", function () {
        var cityEntry = $(".citybox").val().trim()
        getApi(cityEntry)
        
        console.log(cityEntry)
    })
    
    function getApi(city) {
        var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a1bbf9148256f24fbef6c36f2bdaf462&units=imperial`;
        fetch(requestURL)
        .then(function (response) {
            return response.json();
        }) .then(function(data){
            console.log(data)
            var date = moment().format('MMMM D, YYYY');
            var dayTemp = Math.round(data.main.temp);
            var dayHum = data.main.humidity;
            var dayWind = Math.round(data.wind.speed);
            var dayFeelsLike = Math.round(data.main.feels_like);
            var cityName = data.name;
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardName = $("<h1>").addClass("card-name").text(`${cityName}`);
            var cardDate = $("<h2>").addClass("card-date").text(`${date}`);
            var cardTemp = $("<h4>").addClass("card-temp").text(`Temp: ${dayTemp}°F`)
            var cardHum = $("<h4>").addClass("card-temp").text(`Feels Like: ${dayFeelsLike}°F`)
            var cardWind = $("<h4>").addClass("card-temp").text(`Wind: ${dayWind} MPH`)
            var cardFeelsLike = $("<h4>").addClass("card-temp").text(`Humidity: ${dayHum}%`)
            $(".weatherbox").append(card.append(cardBody.append(cardName)))
            $(".weatherbox").append(card.append(cardBody.append(cardDate)))
            $(".weatherbox").append(card.append(cardBody.append(cardTemp)))
            $(".weatherbox").append(card.append(cardBody.append(cardFeelsLike)))
            $(".weatherbox").append(card.append(cardBody.append(cardWind)))
            $(".weatherbox").append(card.append(cardBody.append(cardHum)))
            getForcast(data.coord.lat,data.coord.lon)
        })
    }

    function getForcast(lat,lon) {
        var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=a1bbf9148256f24fbef6c36f2bdaf462&units=imperial`;
        fetch(requestURL)
        .then(function (response) {
            return response.json();
        }) .then(function(data){
            for (var i = 1; i < 6; i++) {
                console.log(data.daily[i])
                var forcastDay = data.daily[i]
                var date = moment.unix(forcastDay.dt).format('M/D/YY');
                var fiveTemp = Math.round(forcastDay.temp.day);
                var fiveHum = forcastDay.humidity;
                var fiveWind = Math.round(forcastDay.wind_speed);
                var fiveFeelsLike = Math.round(forcastDay.feels_like.day);
                var card = $("<div>").addClass("card col");
                var cardBody = $("<div>").addClass("card-body");
                var cardDate = $("<h3>").addClass("card-weather").text(date);
                var cardTemp = $("<h4>").addClass("card-temp").text(`Temp: ${fiveTemp}°F`)
                var cardHum = $("<h6>").addClass("card-temp").text(`Feels Like: ${fiveFeelsLike}°F`)
                var cardWind = $("<h5>").addClass("card-temp").text(`Wind: ${fiveWind} MPH`)
                var cardFeelsLike = $("<h5>").addClass("card-temp").text(`Humidity: ${fiveHum}%`)
                $(".fiveday").append(card.append(cardBody.append(cardDate)))
                $(".fiveday").append(card.append(cardBody.append(cardTemp)))
                $(".fiveday").append(card.append(cardBody.append(cardFeelsLike)))
                $(".fiveday").append(card.append(cardBody.append(cardWind)))
                $(".fiveday").append(card.append(cardBody.append(cardHum)))


            }
        })
    }
   
});
