import { IToken } from '../models/token.interface';

export type SignInProps = {
    setToken: (userToken: IToken) => void;
};