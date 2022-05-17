const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=424fd53f49eb19915aca2357112ffd54&query="+latitude + ","+ longitude

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!",undefined)

        }else if(body.error){
            callback("Unable to find location")
        }else{
            callback(undefined,( "It is currently " + body.current.temperature + "  degrees out.There is a " + body.current.cloudcover + "% chance of rain"))
        }
    })
}

module.exports = forecast