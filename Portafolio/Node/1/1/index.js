const fs = require('fs');

try {
  fs.copyFileSync('file1.txt', 'file2.txt');
  console.log('file1.txt copied to file2.txt successfully.');
} catch (error) {
  console.error('Error copying file1.txt:', error);
}
