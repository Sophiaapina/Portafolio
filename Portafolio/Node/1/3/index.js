const fs = require('fs');

// Data to be written to the file
const data = 'Hello world!';

// Write to 'helloworld.txt'
fs.writeFile('helloworld.txt', data, (err) => {
  if (err) {
    console.error('Error writing to helloworld.txt:', err);
  } else {
    console.log('Successfully wrote to helloworld.txt.');
    // Read and display the content
    fs.readFile('helloworld.txt', 'utf8', (readErr, content) => {
      if (readErr) {
        console.error('Error reading helloworld.txt:', readErr);
      } else {
        console.log('Contents of helloworld.txt:');
        console.log(content);
      }
    });
  }
});
