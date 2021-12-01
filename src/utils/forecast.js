const request = require("request");



const forecast = (latitude , longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f1b087ead238fde841b74374e2647b9&query='+ latitude +','+ longitude +'&units=f';
   request({ url, json: true }, (error, {body}) => {
        
    if(error)
    {
     console.log('Unable to connect weather services' , undefined);
    }
    else if(body.error) {
       callback('Unable to find location' , undefined);
    }
    else{
         callback(undefined , body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out and feels like " + body.current.feelslike)

    }
       
    })
};

module.exports = forecast;