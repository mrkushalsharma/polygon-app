const app = require('express')()
const Polygon = require('../models/Polygon')

const {calculateEuclideanDistance, centroid } = require('../service')

app.get('/polygon', async (req, res) => {
    
    let polygons = await Polygon.find()
    let centroids = [];
    let euclideanDistance = 0;
    if(polygons.length){
        polygons.forEach(polygon => {
            if(polygon.coordinates && polygon.coordinates.length){
                centroids.push({'name': polygon.name, 'points': centroid(polygon.coordinates) });
            }
        });
        if(centroids.length>1){
            euclideanDistance = calculateEuclideanDistance(centroids).toFixed(2);
        }
    }
    let data = {
        message: 'Polygon data fetched',
        polygons,
        centroids,
        euclideanDistance,
        status: 200
    }

    res.send(data)
})

module.exports = app