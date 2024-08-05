// readPdfContent.js
const fs = require('fs');

fs.readFile('pdfContent.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file', err);
    return;
  }

  const content = `const pdfData = \`${data}\`;\nexport default pdfData;`;

  fs.writeFile('src/pdfData.js', content, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file', err);
    } else {
      console.log('PDF data has been written to pdfData.js');
    }
  });
});
