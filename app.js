var https = require('https');
var geocoder = require('geocoder');

var url = 'https://api.forecast.io/forecast/';
var apiKey = '3c255eba41175b4bc837ef23908d2efd' + '/';

// Todo: add ability to pass in a zipcode as a node argv
var zipcode = process.argv[2];

geocoder.geocode(zipcode, function(err, data){
  var body = ''
  if (!err) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var coordinates = lat + ',' + lng;
    url += apiKey;
    url += coordinates;
    https.get(url, function(response){
      response.setEncoding('utf-8')
      if(response.statusCode === 200){
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', function(){
          var parsedBody = JSON.parse(body);
          var currentConditions = parsedBody.currently.summary;
          var currentTemperature = Math.round(parsedBody.currently.temperature);
          printMessage(currentConditions, currentTemperature);
        });
      }
    });
  } else {
    console.log(err);
  }
});

function printMessage(conditions, temperature){
  console.log('The current weather conditions in Central Park are ' + conditions.toLowerCase() + ', with a temperature of ' + temperature + '°F');
};
