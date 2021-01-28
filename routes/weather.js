const express = require('express');
const weather = require('./services/weather');
const weaterService = require('./services/weather');

const router = express.Router();

// router.get('/', (req, res) => {
//     console.log('Hello weather');
//     res.status(200).send('live');
// });

router.get('/', (req, res) => {
    const day = req.query.dia?req.query.dia:1;
    const weather = weaterService.predict(day);
    // const {P, A , B , C} = req.body;
    // console.log('points: ', A, B, C);
    // weaterService.inTriangle(P, A, B, C);
    // weaterService.inLineToSun(A, B, C);
    // console.log(weaterService.inLine({x:-3, y:-1}, {x:1,y:1}, {x:9,y:5}));
    res.status(200).send(weather);
});
module.exports = router;