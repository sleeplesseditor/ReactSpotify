import * as React from 'react';
import { AUTH_URL } from '../../config';
import './Login.scss';

export default function Login() {
    return (
        <div className="container-login">
            <a className="login-btn" href={AUTH_URL}>
                Login with Spotify
            </a>
        </div>
    )
}
