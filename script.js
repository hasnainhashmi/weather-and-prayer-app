window.addEventListener('DOMContentLoaded', function(){

    // $(".mode-icons").slideDown('slow');

let weatherandprayer = {
    getweather : function(city)
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city +"&units=metric&appid=056ec1d46bcfd83023f0099b47285b07")
        .then((response) =>{
            if(!response.ok){
                alert("Weather not available!");
                return;
            }
            else
            {
                return response.json();
            }
        })
        .then((data) => this.showweather(data));
    },

    showweather : function(data)
    {
        const {name} = data;
        const {country} = data.sys;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        let place = name + " " + country;
        //Displaying weather display element by removing loading class
        // document.querySelector(".weather-display").classList.remove("hidden");
        $(".weather-display").css('display','flex').hide().slideDown('slow');

        //putting data in HTML elements
        let firstlow = description.charAt(0);
        let firstup = firstlow.toUpperCase();
        let second = description.slice(0, 0) + description.slice(1, description.length);
        

        document.querySelector(".place").innerHTML = "Weather in " + place + " :";
        document.querySelector(".desc-text").innerHTML = firstup + second;
        document.querySelector(".desc-icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".temp-text").innerHTML = "Temperature";
        document.querySelector("#temperature").innerHTML = temp + "°C";
        document.querySelector(".humidity-text").innerHTML = "Humidity";
        document.querySelector("#humidity").innerHTML = humidity + "%";
        document.querySelector(".wind-text").innerHTML = "Wind-Speed";
        document.querySelector("#wind-speed").innerHTML = speed + "km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ")')";
    },


    getprayer : function(city)
    {
        fetch("https://api.pray.zone/v2/times/today.json?city="+city)
        .then((response) => {
            if(!response.ok)
            {
                alert("Not Found !");
            }
            else{
                return response.json();
            }
        })
        .then((data) => this.showprayer(data));
    },

    showprayer : function(data)
    {
        const {Sunrise, Fajr, Dhuhr, Asr, Sunset, Maghrib, Isha, Midnight} = data.results.datetime[0].times;
        // console.log(Sunrise, Fajr, Dhuhr, Asr, Sunset, Maghrib, Isha, Midnight);
        //putting data into elements
        //Displaying weather display element by removing loading class
        // document.querySelector(".weather-display").classList.remove("hidden");
        $(".prayer").css('display','block').hide().slideDown('slow');

        document.querySelector(".sunrise-text").innerHTML = "Sunrise :";
        document.querySelector(".sunrise-value").innerHTML = Sunrise;
        document.querySelector(".fajr-text").innerHTML = "Fajr :";
        document.querySelector(".fajr-value").innerHTML = Fajr;
        document.querySelector(".dhuhr-text").innerHTML = "Dhuhr :";
        document.querySelector(".dhuhr-value").innerHTML = Dhuhr;
        document.querySelector(".asr-text").innerHTML = "Asr :";
        document.querySelector(".asr-value").innerHTML = Asr;
        document.querySelector(".sunset-text").innerHTML = "Sunset :";
        document.querySelector(".sunset-value").innerHTML = Sunset;
        document.querySelector(".maghrib-text").innerHTML = "Maghrib :";
        document.querySelector(".maghrib-value").innerHTML = Maghrib;
        document.querySelector(".isha-text").innerHTML = "Isha :";
        document.querySelector(".isha-value").innerHTML = Isha;
        document.querySelector(".midnight-text").innerHTML = "Midnight :";
        document.querySelector(".midnight-value").innerHTML = Midnight;

    }




};

let modeEl = document.querySelector(".mode-icons");
let search_Button = document.querySelector("#search-btn");
let search_text = document.querySelector("#search-text");

//adding event listener for dark/light mode
modeEl.addEventListener("click", function(event)
{
    let item = event.target;
    if(item.classList[1] === 'fa-sun')
    {
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--bgc', 'rgba(255, 255, 255)');
        document.documentElement.style.setProperty('--search-color', 'white');   
        document.documentElement.style.setProperty('--search-bgc', 'black'); 
        item.classList.add("active");  
        item.nextSibling.classList.remove("active");  
    }
    else if(item.classList[1] === 'fa-moon')
    {
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--bgc', 'rgba(0, 0, 0, 0.85)');
        document.documentElement.style.setProperty('--search-color', 'black');
        document.documentElement.style.setProperty('--search-bgc', 'white');
        item.classList.add("active");  
        item.previousSibling.classList.remove("active"); 

    }
})



search_Button.addEventListener("click", function(){
    let search_text = document.querySelector("#search-text");
    weatherandprayer.getweather(search_text.value);
    weatherandprayer.getprayer(search_text.value);
})

search_text.addEventListener("keyup", function(event){
    if(event.keyCode === 13)
    {
        weatherandprayer.getweather(this.value);
        weatherandprayer.getprayer(this.value);
        // console.log(this.value);
    }
})

})

// weatherandprayer.getprayer("rawalpindi");


// weather.getweather("islamabad");