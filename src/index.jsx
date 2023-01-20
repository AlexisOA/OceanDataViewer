import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './static/Leaflet.MultiOptionsPolyline.js'
import './static/Leaflet.PolylineMeasure.js'
import './static/Leaflet.PolylineMeasure.css'
import { Provider } from 'react-redux';
import {createAppStore} from './store/config/storeConfig'


const root = ReactDOM.createRoot(document.getElementById('root'));
let appStore = createAppStore()

root.render(
  <Provider store={appStore}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>
);
