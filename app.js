const express = require('express');

const weather = require('./routes/weather');

const app = express();


app.use(express.json());

app.use('/api/clima', weather);

app.listen(3000, () => {
    console.log('app listening on port 3000');
});

