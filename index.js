import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Instagram from './routes/Instagram';

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={"/"} exact  component={App}/>
        <Route path={"/instagram"} exact component={() => <Instagram  />} />
        <Route path="/instagram/:username" component={Instagram} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
