/* jshint esversion: 6 */
/* jshint ignore:start */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure } from './store/configure';
import {} from 'redux-devtools'

const store=configure()

const root = document.getElementById('root');

let render=()=>{
    ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, root );
};

if(module.hot) {
    module.hot.accept('./app/layout/App', () => {
        setTimeout(render);
    });
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
