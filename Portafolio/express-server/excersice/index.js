const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define the route to handle the form submission and BMI calculation
app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height)) {
    res.send('Please enter valid weight and height.');
  } else {
    const bmi = (weight / (height ** 2)) * 10000;
    res.send(`Your BMI is: ${bmi.toFixed(2)}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
