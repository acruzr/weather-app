const planets = [{
        name: "Ferengi",
        label: "A",
        distance: 500,
        motion: 1
    }, 
    {
        name: "Betasoide",
        label: "B",
        distance: 2000,
        motion: 3
    }, 
    {
        name: "Vulcano",
        label: "C",
        distance: 1000,
        motion: 5
    }, 

];
const SUN = {
    x: 0.0,
    y: 0.0
};

function predict(days=1, years=10, referTo='ferengi'){
    
    let ferengi, betasoide, vulcano;
    let dry, rain, spring;
    let A,B,C;
    let currentYear=1;
    let currentDay=1;
    let targetWeather={};
    let weatherDay='';
    let reachedLimit=false;
    let grad=0;
    let rad=0;
    
    dry = rain = spring = 0;
    ferengi = betasoide = vulcano = 0;
    A = B = C = {};

    while (currentYear<=years){
        while (grad<360*currentYear){
            rad = (Math.PI / 180)*ferengi;
            A = { x: Math.cos(rad).toFixed(6),
                  y: Math.sin(rad).toFixed(6) };
            rad = (Math.PI / 180)*vulcano;
            B = { x: 2*Math.cos(rad).toFixed(6),
                  y: 2*Math.sin(rad).toFixed(6) };
            rad = (Math.PI / 180)*betasoide;
            C = { x: 4*Math.cos(rad).toFixed(6),
                  y: 4*Math.sin(rad).toFixed(6) };

            if (inTriangle(SUN, A, B, C)) {
                weatherDay = 'rain';
                rain++;
            }
            if (inLineToSun(A, B, C)) {
                weatherDay = 'dry';
                dry++;
            }
            if (inLine(A, B, C)) {
                weatherDay = 'spring';
                spring++;
            }

            currentDay++;
            if (currentDay>days && !reachedLimit){
                reachedLimit = !reachedLimit;
                targetWeather.weather = weatherDay;
            }

            vulcano+=5;
            betasoide+=3;
            ferengi+=1;

            if (referTo === 'ferengi'){
                grad = ferengi;
            } else if(referTo === 'vulcano'){
                grad = vulcano;
            } else {
                grad = betasoide;
            }
        }
        currentYear++;
    }

    return {
        prediction: {
            years: years,
            civilization: referTo,
            dry: {
                days: dry
            },
            rain: {
                days: rain
            },
            spring: {
                days: spring
            },
        },
        query: {
            day: days,
            weather: targetWeather.weather
        }
    };
}

function inTriangle(P, A, B, C){
    
    const D = {
        x: B.x - A.x,
        y: B.y - A.y
    }
    const E = {
        x: C.x - A.x,
        y: C.y - A.y
    }

    const w1 = (E.x*(A.y - P.y) + E.y*(P.x - A.x))/(D.x*E.y - D.y*E.x);
    const w2 = (P.y - A.y - w1*D.y) / E.y;

    // if (w1 >= 0 && w2>= 0 && w1+w2 <=1){
    //     console.log('the point ', P, ' is inside the triangle made by the points');
    // } else {
    //     console.log('the point ', P, ' is NOT inside the triangle made by the points');
    // }
    return w1 >= 0 && w2>= 0 && w1+w2 <=1;
}

function inLineToSun(A, B, C){
    const m = A.y/ A.x;

    // if (B.y !== m*B.x){
    //     console.log('NO, the points are NOT in line with SUN');
    //     return;
    // }
    // if (C.y !== m*C.x) {
    //     console.log('NO, the points are NOT in line with SUN');
    //     return;
    // }
    // console.log('YES, the points are in line with SUN');
    return B.y === m*B.x && C.y === m*C.x;
}

function inLine(A, B, C){
    // if ((B.x-A.x)/(C.x-B.x) !== (B.y-A.y)/(C.y-B.y)){
    //     console.log('NO, the points are NOT in line');
    //     return;
    // }
    
    // console.log('YES, the points are in line but NOT to SUN');

    return (B.x-A.x)/(C.x-B.x) === (B.y-A.y)/(C.y-B.y) && !inLineToSun(A, B, C);
}

module.exports = {
    inTriangle,
    inLineToSun,
    inLine,
    predict
};