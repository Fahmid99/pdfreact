import { readFile, writeFile } from 'fs';

// Read the content of the txt file
readFile('C:/projects/pdf-react/src/pdfContent.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Convert the content to Base64
    const base64Content = Buffer.from(data).toString('base64');

    // Write the Base64 content to a new file
    writeFile('C:/projects/pdf-react/src/base64Content.txt', base64Content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('Base64 content written to file successfully!');
    });
});
