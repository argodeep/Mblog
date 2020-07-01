import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';
import * as API from '../../services/axios';
import { setUser, setUsers } from '../../services/redux/actions'

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const dispatch = useDispatch();
    const route = useHistory()
    document.title = "mBlogging.site | Login";

    async function login(event: any) {
        event.preventDefault();
        if (username && password) {
            let user = await API.login();
            const userIndex = user.findIndex((e: any) => e.username === username && e.password === password)
            if (user && userIndex !== -1) {
                dispatch(setUsers(user));
                dispatch(setUser(user[userIndex]));
                route.push('/');
            } else {
                setErrorText('Wrong password or username')
            }
        } else {
            setErrorText('Enter username & password both')
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
                width: '100%',
                height: '100vh'
            }}
        >
            <form className="form" onSubmit={(event) => login(event)}>
                <input type="string" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username address" />
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                <p style={{ textAlign: "center", color: 'red', margin: '0px 0px 8x 0px' }}>{errorText}</p>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <button type="submit">Login</button>
                    <button type="button" style={{marginLeft: 8}}>Register</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
