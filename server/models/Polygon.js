const { Schema, model } = require('mongoose')

var PolygonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: []
});

var Polygon = model('Polygon', PolygonSchema)

module.exports = Polygon;