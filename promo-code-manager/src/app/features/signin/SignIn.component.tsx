import React, { FormEvent } from 'react';

import './SignIn.component.css';
import { SignInProps } from './types/SignInProps.type';
import { SignInState } from './types/SignInState.type';
import { IToken } from './models/token.interface';
import config from '../../../config/config.json';

/**
 * 
 */
class SignIn extends React.Component<SignInProps, SignInState> {
    /**
     * 
     * @param props - signin props are properties that my be passed from another component to the signin component.
     */
    constructor(props: SignInProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.setUserName = this.setUserName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 
     * @param value 
     */
    setUserName(value: string): void {
        this.setState({ username: value });
    }

    /**
     * 
     * @param value 
     */
    setPassword(value: string): void {
        this.setState({ password: value });
    }

    /**
     * @function signIn - authenticates a user.
     * @async
     * @param credentials - creadentials are used to authenticate a user.
     * @returns Promise<Response> - on a successful authenticate a valid token is generated and returned.
     */
    async signIn(credential: {
        username: string,
        password: string
    }): Promise<IToken> {
        return fetch(`${config.SERVER_URL}/${config.API_END_POINTS.SIGN_IN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential)
        }).then(data => data.json())
    }

    /**
     * 
     * @param _event - FormEvent<HTMLFormElement>
     */
    async handleSubmit(_event: FormEvent<HTMLFormElement>): Promise<void> {
        _event.preventDefault();
        const token = await this.signIn({
            username: this.state.username,
            password: this.state.password
        });
        this.props.setToken(token);
    }

    /**
     * 
     * @returns JSX.Element 
     */
    render(): JSX.Element {
        return (
            <main className="container h-100" >
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="card col-12 shadow border-0 form-signin">
                        <div className="card-header bg-white">
                            <h1 className="h3 mb-3 fw-normal">Sign in to Promo</h1>
                            <div className="card-subtitle">
                                <a href="/signup" className="card-link text-decoration-none">New to Promo? SignUp!</a>
                            </div>
                        </div>
                        <div className="card-body">
                            <form className="col-12" onSubmit={(evt) => this.handleSubmit(evt)}>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Username" required
                                        onChange={(evt) => this.setUserName(evt.target.value)} />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                                        onChange={(evt) => this.setPassword(evt.target.value)} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">SignIn</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

/**
 * 
 */
export default SignIn;
