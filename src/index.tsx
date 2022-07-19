import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

LogRocket.init('4mi7lc/inventary');
setupLogRocketReact(LogRocket);