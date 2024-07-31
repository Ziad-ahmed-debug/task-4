const request = require("request")


const forecast = (latitude , longtitude , callback) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=e1778465aaf54fc2b5c52707242007&q=" + latitude + "," + longtitude
    
    request ({url , json : true  } , (error , response) => {
    
        if (error) {
            callback ( "the program can't call the website" , undefined )
        } 
        else if (response.body.error)
          {
             callback (response.body.error.message , undefined )
        }
        else 
        {
    
          callback (undefined , response.body.location.name + " weather is : " + response.body.current.condition.text 
            + "\n and temp is : "  + response.body.current.temp_c )
        }
    })
      }

    module.exports = forecast

