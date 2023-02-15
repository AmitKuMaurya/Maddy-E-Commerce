import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
// import {CookiesProvider} from "react-cookie"
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from './store';

// import AlertTemplate from "react-alert-template-basic";
// import { positions, transitions, Provider as AlertProvider } from "react-alert";


const root = ReactDOM.createRoot(document.getElementById('root'));


// const options = {
//   timeout: 5000,
//   positions: positions.TOP_RIGHT,
//   transition: transitions.SCALE,
// };

root.render(
    <BrowserRouter>
    <Provider store={store}>
  <PersistGate persistor={persistor}>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
          <App />
      {/* </AlertProvider> */}
  </PersistGate>
    </Provider>
    </BrowserRouter> 
);

reportWebVitals();
