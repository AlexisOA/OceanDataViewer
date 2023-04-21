import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from 'react-redux';
import {createAppStore} from './store/config/storeConfig'
import '../src/sidevar-v2/leaflet-sidebar.css'
import '../src/sidevar-v2/leaflet-sidebar.js'
import Footer from './components/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
let appStore = createAppStore()

root.render(
  <Provider store={appStore}>
    {/* <React.StrictMode> */}
      <App />
      
    {/* </React.StrictMode> */}
  </Provider>
);
