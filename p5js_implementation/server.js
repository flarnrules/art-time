const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));  // Serve your p5.js sketch from the 'public' directory

app.post('/save', (req, res) => {
    const gifPath = path.join(__dirname, 'public', 'gifs', 'your-gif.gif');
    const jsonPath = path.join(__dirname, 'public', 'gifs', 'info.json');

    const writeStream = fs.createWriteStream(gifPath);
    req.pipe(writeStream);

    writeStream.on('close', () => {
        const info = {
            // TODO: Fill in the desired information
        };
        fs.writeFileSync(jsonPath, JSON.stringify(info, null, 2));
        res.sendStatus(200);
    });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
