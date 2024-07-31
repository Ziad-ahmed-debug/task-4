let form = document.getElementById('form1')
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitude = document.getElementById('latitude')
const longitude = document.getElementById('longitude')
const welcome = document.getElementById('welcome')

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    welcome.style.display = "none"

    locationF.innerText = ''
     forecastF.innerText = ''
    latitude.innerText = ''
    longitude.innerText = ''
    errorF.innerText = ''
    errorF.style.display = "none"
    locationF.style.display = "none"
    latitude.style.display = "none"
    longitude.style.display = "none"
    forecastF.style.display = "none"

    weatherFun()
})

let weatherFun = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)

        if(data.error)
        {

            errorF.innerText = "Error: " + data.error
            errorF.style.display = "block"
            locationF.innerText = ''
            forecastF.innerText = ''
            latitude.innerText = ''
            longitude.innerText = ''
            locationF.style.display = "none"
            latitude.style.display = "none"
            longitude.style.display = "none"
            forecastF.style.display = "none"
        }
        else 
        {

              errorF.innerText = ''
              errorF.style.display = "none"

            locationF.innerText = "Country is: " + data.location
            locationF.style.display = "block"

            setTimeout(function() { 
                latitude.innerText = "Latitude is: " + data.latitude
                latitude.style.display = "block"
            }, 2000);
            
            setTimeout(function() { 
                longitude.innerText = "Longitude is: " + data.longitude
                longitude.style.display = "block"
            }, 4000); 

            setTimeout(function() { 
                forecastF.innerText = "Forecast is:  " + data.forecast
                forecastF.style.display = "block"
            }, 6000); 
           
        }
    }
    catch(e){
        console.log(e)
    }
}


