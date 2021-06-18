import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

/**
 * Components.
 */
import AppLayout from './App.component';
import SignUp from './features/signup/SignUp.component';
import SignIn from './features/signin/SignIn.component';

/**
 * Hook to manage the jwt token.
 */
import useToken from './core/hooks/useTokes.hook';

/**
 * 
 * @returns 
 */
function AppRouter() {
    /**
     * 
     */
    const { token, setToken } = useToken();
    console.log(`${token?.accessToken}`);

    /**
     * 
     */
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {token?.accessToken ? <Redirect from="*" to="/home" /> : <SignIn setToken={setToken} />}
                </Route>
                <Route exact path='/signup'>
                    <SignUp />
                </Route>
                <Route exact path='/home'>
                    <AppLayout
                        title='Promo Sevices'
                        subTitle='Promo Codes'
                    />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;