import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
 import  Home from  './Home';
// import Map from './Map';
//import Main from  './Main';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
