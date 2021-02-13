/* jshint esversion: 6 */
/* jshint ignore:start */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure } from './store/configure';
import { createDevTools } from 'redux-devtools'
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const root = document.getElementById('root');
const store=configure()

let render=()=>{
    ReactDOM.render(<Provider store={store}>
        <BrowserRouter>
        <ReduxToastr
        position='bottom-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        />
        <App />
        </BrowserRouter>
        </Provider>, root );
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
