const fs = require('fs');
const csvFilePath = './POLYGON.csv';
const mongoose = require('./dbConnection')
const Polygon = require('./models/Polygon')

fs.readFile(csvFilePath, 'utf8', function (err, data) {
  
    if (err) {
        return console.log(err);
    }else{
        const lines = data.split(/\r?\n/);
        lines.forEach(line => {

            let polygonInfos = line.split(',');

            let polygon = new Polygon();
            polygon.name = polygonInfos[1];

            let polygonSides =  polygonInfos[2].split('|')

            let newCoordinates = [];
            polygonSides.forEach(side => {
                let sides = side.split('-');
                newCoordinates.push([sides[0], sides[1]]) ;
            })
            polygon.coordinates = newCoordinates;
            console.log(polygon)
            // polygon.save((err, a) => {
            //     if (err) {
            //         console.log('err', err);
            //         return false;
            //     }
            //     console.log(`Polygon ${polygonInfos[1]} Migrated`);
            //     return true;
            // })

        });
    }
});