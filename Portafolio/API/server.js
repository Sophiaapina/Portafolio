const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., index.html, styles, and images)
app.use(express.static('public'));

// Define a route to handle API calls
app.get('/weather', (req, res) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const city = req.query.city; // Get the city from the query parameter

  // Build the URL for the OpenWeatherMap API call
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Make the API call using the https module
  https.get(url, (apiResponse) => {
    let data = '';

    // Handle the response data in chunks
    apiResponse.on('data', (chunk) => {
      data += chunk;
    });

    // Process the complete response
    apiResponse.on('end', () => {
      try {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        // Send the weather information to the client
        res.send(`
          <h1>Weather in ${city}</h1>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
          <img src="${icon}" alt="${description} icon">
          <p><a href="/">Go back to the home page</a></p>
        `);
      } catch (error) {
        console.error('Error parsing OpenWeatherMap API response:', error);
        res.send('An error occurred while fetching weather data. Please try again later.');
      }
    });
  }).on('error', (error) => {
    console.error('API call error:', error);
    res.send('An error occurred while fetching weather data. Please try again later.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
