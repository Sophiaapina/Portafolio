const fs = require('fs');

// Read the contents of file1.txt
fs.readFile('file1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file1.txt:', err);
  } else {
    console.log('Contents of file1.txt:');
    console.log(data);
  }
});
