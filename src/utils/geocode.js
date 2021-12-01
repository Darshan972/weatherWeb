const request = require("request");
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors())

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZG9kbzU0NSIsImEiOiJja3dnNWpld2cwMjdrMzJvdzczOWpxcmh2In0.lIJR4-QbWkJVdTbNgW8OBQ&limit=1';
    request({ url , json: true} , (error , {body}) => {
        
        if(error)
        {
            callback('unable to connect to location services' , undefined)
        }
        else if(body.features.length === 0)
        {
         callback('unable to find location' , undefined)
        }
        else{
            callback(undefined , {
                latitude: body.features[0].center[0],
                longigtude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;