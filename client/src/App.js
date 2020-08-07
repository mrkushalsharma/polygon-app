import React , { Suspense } from 'react';
import type from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Canvas from 'react-canvas-polygons';
import Polygon from './components/Polygon';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello</h1>
          <Polygon />
      </header>
    </div>
  );
}

export default App;
