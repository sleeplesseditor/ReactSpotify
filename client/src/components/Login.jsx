import * as React from 'react';
import { AUTH_URL } from '../config';

export default function Login() {
    return (
        <div>
            <a href={AUTH_URL}>
                Login with Spotify
            </a>
        </div>
    )
}
