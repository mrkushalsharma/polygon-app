import React from 'react'
import type from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Canvas from 'react-canvas-polygons';

export default class Polygon extends React.Component {

    state = {
        polygons: [],
        centroids: [],
        euclideanDistance: 0,
        isLoaded: false
    }

    handleCleanCanva = () => this.canva.cleanCanvas();

    
    componentDidMount() {
        this.fetchPolygon()
    }

    fetchPolygon = () => {
        console.log(this.state)
        fetch('http://localhost:5000/api/polygon')
            .then(res => res.json())
            .then(({polygons, centroids, euclideanDistance }) => this.setState({polygons, centroids, euclideanDistance, isLoaded: true}))
    }

    render() {
        const { polygons, centroids, euclideanDistance, isLoaded } = this.state;
        if(!isLoaded){
            return (
                <div>Loading...
                </div>
            )
        }else{
            console.log(centroids[0].points[0])
            return (
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
            )
        }
         
    }
}