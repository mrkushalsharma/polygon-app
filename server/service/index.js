
function centroid(coordinates){
    let n = coordinates.length;
    let centroidX = 0;
    let centroidY = 0;
    coordinates.forEach(coordinate => {
        centroidX += parseInt(coordinate[0]);
        centroidY += parseInt(coordinate[1]);    
    });
    return [(centroidX/n).toFixed(2), (centroidY/n).toFixed(2)]
}

function calculateEuclideanDistance(centroids){
    let cx = 0;
    let cy = 0;
    let count = 1;
    centroids.forEach( centroid => {
        if(count == 1){
            cx = centroid.points[0];
            cy = centroid.points[1];
        }else{
            cx -= parseFloat(centroid.points[0]);
            cy -= parseFloat(centroid.points[1]);
        }
        count++;
    })
    let result = Math.sqrt( (cx*cx) + (cy*cy) )
    return result;
}


module.exports = {
    calculateEuclideanDistance,
    centroid
}