import React, { useState } from "react";
import LoginContext from '../context/login-context';

const Login = () => {
    const [id, setId] = useState();
    const [password, setPassword] = useState();

    return (
        <LoginContext.Consumer>{
            value =>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  placeholder="Login"
                  type="text"
                  onChange={e => setId(e.target.value)}
                  onKeyDown={e => {e.key === 'Enter' && value.checkCredentials(id, password)}}
                  style={{ margin: '2vw'}}
                />
                <input
                  placeholder="Password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => {e.key === 'Enter' && value.checkCredentials(id, password)}}
                  style={{ margin: '2vw'}}
                />
                <button
                  type="submit"
                  onClick={() => value.checkCredentials(id, password)}
                  style={{ margin: '2vw auto', width: '30%'}}
                >
                  OK
                </button>
                </div>
          }</LoginContext.Consumer>
    )
}

export default Login;
