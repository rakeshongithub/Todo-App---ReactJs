import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import App from './components/App';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/all"/>
            <Route path="/active"/>
            <Route path="/completed"/>
            <IndexRedirect to='/all'/>
        </Route>
    </Router>,
    document.getElementById('root')
);
