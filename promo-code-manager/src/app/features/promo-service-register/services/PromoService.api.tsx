import axios from 'axios';
import config from '../../../../config/config.json'
import { IToken } from '../../signin/models/token.interface';

const token: IToken = JSON.parse(localStorage.getItem('token') || '{}');

/**
 * 
 */
export default axios.create({
    baseURL: config.SERVER_URL,
    headers: {
        Authorization: `Bearer ${token.accessToken}`
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});