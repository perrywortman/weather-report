var https = require('https')
var geocoder = require('geocoder')
var secretKey = require('./myKey')

var url = 'https://api.darksky.net/forecast/'
var apiKey = secretKey + '/'

var location = process.argv[2]

geocoder.geocode(location, function(err, data){
  var body = ''
  if (!err) {
    var lat = data.results[0].geometry.location.lat
    var lng = data.results[0].geometry.location.lng
    var coordinates = lat + ',' + lng
    url += apiKey
    url += coordinates
    https.get(url, function(response){
      if(response.statusCode === 200){
        response.on('data', (chunk) => {
            body += chunk
        })
        .on('end', function(){
          var parsedBody = JSON.parse(body)
          var currentConditions = parsedBody.currently.summary
          var currentTemperature = Math.round(parsedBody.currently.temperature)
          printMessage(currentConditions, currentTemperature)
        })
      }
    })
  } else {
    console.log(err)
  }
})

function printMessage(conditions, temperature){
  console.log('The current weather conditions for ' + location + ' are ' + conditions.toLowerCase() + ', with a temperature of ' + temperature + '°F')
}
