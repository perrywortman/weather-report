var https = require('https');
// var geocoder = require('geocoder');

var url = 'https://api.forecast.io/forecast/';
var apiKey = '3c255eba41175b4bc837ef23908d2efd' + '/';
var location = '40.7833,-73.9667';

// Todo: add ability to pass in a zipcode as a node argv
// var zipcode = process.argv[2];
// var location = geocoder.geocode(zipcode, function(error, data){
//   if(error === null){
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var coordinates = lat + ',' + lng;
//     url += coordinates;
//   } else {
//     console.error(error);
//   }
// });

var request = https.get(url + apiKey + location, function(response){
  if(response.statusCode === 200){
    var body = '';
    response.on('data', (chunk) => body += chunk);
    response.on('end', function(){
      var parsedBody = JSON.parse(body);
      var currentConditions = parsedBody.currently.summary;
      var currentTemperature = Math.round(parsedBody.currently.temperature);
      printMessage(currentConditions, currentTemperature);
    });
  }
});

function printMessage(conditions, temperature){
  console.log('The current weather conditions in Central Park are ' + conditions.toLowerCase() + ', with a temperature of ' + temperature + '°F');
};
