import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
  </Provider>
)

// reportWebVitals();  Esto es opcional ya que mide el rendimiento de la aplicacion web y envia los datos a una funcion. 
//Util para monitorear metricas como el tiempo de carga y la interaccion del usuario.
