import React , { useRef, useEffect, useState } from 'react';

function App() {
  
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [euclideanDistance, setEuclideanDistance] = useState(0);

  const polygonEndPoint = 'http://localhost:5000/api/polygon';
  const centroidColor = 'red';
  const polygonColor = 'blue';
  const lineColor = "black";
  const canvasWidth = 1000;
  const canvasHeight = 1000;

  useEffect(() => {

    fetch(polygonEndPoint)
    .then(res => res.json())
    .then(
      ({polygons, centroids, euclideanDistance }) => {
        setIsLoaded(true);
        setPolygons(polygons);
        setCentroids(centroids);
        setEuclideanDistance(euclideanDistance);

        if(!isLoaded){

          const canvas = canvasRef.current;
          canvas.width = canvasWidth;
          canvas.height = canvasWidth;
          canvas.style.width = `${canvasWidth}px`;
          canvas.style.height = `${canvasHeight}px`;

          const context = canvas.getContext("2d")
          context.lineCap = "round"
          context.strokeStyle = centroidColor
          context.lineWidth = 10
          contextRef.current = context;
        
            //draw centroid dot
            centroids.forEach(centroid => {
              contextRef.current.beginPath()
              // contextRef.current.fillRect(centroid.points[0], centroid.points[1],5,5);
              contextRef.current.moveTo(centroid.points[0], centroid.points[1])
              contextRef.current.lineTo(centroid.points[0], centroid.points[1])
              contextRef.current.stroke()
              contextRef.current.closePath()
            });

            //draw polygon
            polygons.forEach(polygon => {

              let polygonLength = polygon.coordinates.length;
              let count = 0;
              context.strokeStyle = polygonColor

              polygon.coordinates.forEach(coordinate => {
                context.lineWidth = 10;
                context.strokeStyle = polygonColor
                contextRef.current.beginPath()
                // contextRef.current.fillRect(coordinate[0], coordinate[1],5,5);
                contextRef.current.moveTo(coordinate[0], coordinate[1])
                contextRef.current.lineTo(coordinate[0], coordinate[1])
                contextRef.current.stroke()            
                context.strokeStyle = lineColor

                context.lineWidth = 2

                if(count < polygonLength-1){
                  contextRef.current.beginPath()
                  contextRef.current.moveTo(coordinate[0], coordinate[1])
                  contextRef.current.lineTo(polygon.coordinates[count+1][0], polygon.coordinates[count+1][1])
                  contextRef.current.stroke()            
                }else{

                  contextRef.current.beginPath()
                  contextRef.current.moveTo(coordinate[0], coordinate[1])
                  contextRef.current.lineTo(polygon.coordinates[0][0], polygon.coordinates[0][1])
                  contextRef.current.stroke()    
                }
                count++;
              });

            });

        }

      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )  

  }, [])

  if(!isLoaded){
    return <div>Loading...</div>;
  }else{
    console.log(polygons)
    return (
      <div className="App">
          <div>
            <div>Euclidean Distance: {euclideanDistance}</div>
          
            <div> Centroid : 
              <ul>
                {centroids.map(centroid => (
                  <li key={centroid.name}>
                    {centroid.name}: Points ({centroid.points[0]}, {centroid.points[1]} )
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <canvas
            ref={canvasRef}
          />
      </div>
    );
  }
}

export default App;
