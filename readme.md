# Command Line Weather App
Uses [node.js](https://nodejs.org/en/docs/) to pull data from the [forecast.io](https://developer.forecast.io/) weather API to display the current conditions and temperature for the argument that you pass to node. Can be a zipcode or a city. Note that the city must be passed as a string, ex. `"Paris, TX"` unless you can pass as a single word `Paris`(will default to Paris, FR).

Run from terminal: `node app.js 90210` or `node app.js "Monkey's Eyebrow, AZ"`  

## Todo
* ~~Add ability to pass a zipcode as an argv using the npm module [geocoder](https://www.npmjs.com/package/geocoder).~~
* Add a client-side interface for mobile and desktop
* Play a Weather Report snippet depending on the current conditions for improved accessibility
