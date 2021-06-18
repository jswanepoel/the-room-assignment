import { useState } from 'react';

import { IToken } from '../../features/signin/models/token.interface';

export default function useToken() {
    const getToken = (): IToken => {
        const tokenString = localStorage.getItem('token') || '{}';
        const userToken: IToken = JSON.parse(tokenString);
        return userToken;
    };
    const [token, setToken] = useState<IToken>(getToken());
    const saveToken = (userToken: IToken): void => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}