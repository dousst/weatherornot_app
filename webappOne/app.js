window.addEventListener('load',()=> {
    //getting coords
    let long;
    let lat;
    let placeTZ = document.querySelector('.place-timezone');
    let temperatureDegree = document.querySelector('.degree');
    let temperatureDesc = document.querySelector('.tempdesc');
    let degreeSec = document.querySelector('.temp');
    let degreeSpan = document.querySelector('.temp span');

    //if the location exists in the browser then do the following
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat= position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/0b6486f9158497fe3c30e0c7ecb96641/${lat},${long}`;

        fetch(api)
            .then(response => {
                return response.json();
            }).then(data => {
                const {temperature, summary, icon} = data.currently;
            //FORMULA
            let cel = (temperature - 32) * (5/9);     
           //SET DOM ELEMENTS FROM THE API
                temperatureDegree.textContent = temperature;
                temperatureDesc.textContent = summary;
                placeTZ.textContent = data.timezone;
           //SET ICON
                setIcons(icon, document.querySelector(".icon"));  
           //CHANGE THE TEMP TO CELSIUS/FARENHEIT  
                degreeSec.addEventListener('click', () => {
                    if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(cel);
                    }else{
                        degreeSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });        
            });
        });
    }else{
        h2.textContent = "Oops!"
        h5.textContent ="Seems like your browser doesn't support this function"
    } 
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});