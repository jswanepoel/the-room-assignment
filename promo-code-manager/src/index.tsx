import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import AppRouter from './app/App.router';


/* eslint-disable max-statements */
/**
 * 
 */
const initialize = () => {
    ReactDOM.render(
        <React.StrictMode>
            <AppRouter />
        </React.StrictMode>,
        document.getElementById('promo-root'));
}
/* eslint-enable max-statements */

document.addEventListener('DOMContentLoaded', () => {
    try {
        window.localStorage.test = 'You appear to be unable to write to localStorage';
    } catch (e) {
        document.body.innerHTML = `
          <div class="mobile-incompatibility">
            <h4>Your browser is not able to write to local storage.</h4>
            <p>If you are using private mode please disable it.</p>
            <p>Otherwise your browser is not supported or you have local storage turned off in your browser preferences.</p>
          </div>`;
    }
    initialize();
});