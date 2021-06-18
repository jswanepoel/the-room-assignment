import React, { FormEvent } from 'react';

import './SignUp.component.css';
import { SignUpProps } from './types/SignUpProps.type';
import { SignUpState } from './types/SignUpState.type';
import config from '../../../config/config.json';
import { ISignUpResponse } from './models/SignUpResponse.interface';

class SignUp extends React.Component<SignUpProps, SignUpState> {
    /**
     *
     */
    constructor(props: SignUpProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: ''
        };
        this.setUserName = this.setUserName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
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
     * 
     * @param value 
     */
    setEmail(value: string): void {
        this.setState({ email: value });
    }

    /**
     * @function signUp - 
     * signing up a new user on the promo web app.
     * on a successful sign up, the app will redirect to the singin page.
     * @async
     * @param signUpCredential - sign up creadentials are used to sign up a user.
     * @returns Promise<ISignUpResponse> - returns a response indicating if the signup was a success.
     */
    async signUp(signUpCredential: {
        username: string,
        password: string,
        email: string
    }): Promise<ISignUpResponse> {
        return fetch(`${config.SERVER_URL}/${config.API_END_POINTS.SIGN_UP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpCredential)
        }).then(data => data.json())
    }

    /**
     * @function handleSubmit -
     * handle the form data submition.
     * 
     * @param _event - FormEvent<HTMLFormElement>
     */
    async handleSubmit(_event: FormEvent<HTMLFormElement>): Promise<void> {
        _event.preventDefault();
        const signUpResponse = await this.signUp({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        });

        if (signUpResponse.success) {
            window.location.href = '/';
        }
    }

    render(): JSX.Element {
        return (
            <main className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="card col-12 shadow border-0 form-signup">
                        <div className="card-header bg-white">
                            <h1 className="h3 mb-3 fw-normal">Sign up to Promo</h1>
                            <div className="card-subtitle">
                                <a href="/" className="card-link text-decoration-none">Already have a Promo account? SignIn!</a>
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
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                                        onChange={(evt) => this.setEmail(evt.target.value)} />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                                        onChange={(evt) => this.setPassword(evt.target.value)} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">SignUp</button>
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
export default SignUp;