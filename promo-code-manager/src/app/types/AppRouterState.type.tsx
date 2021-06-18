/**
 * 
 */
export type AppRouterState = {
    token: string;
    isSignedIn: boolean;
    setToken: (token: string) => void;
};