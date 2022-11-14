
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const setDemoUser = () => {
    setCredential('Demo-lition');
    setPassword('password')
  }

  return (
    <div className='login-form-container'>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div >
      <label>
        Username or Email:
        <div>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        </div>
      </label>
      </div>
      <div>
      <label>
        Password:
        <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
      </label>
      </div>
      <button className='login-form-button' id='login-form-login' type="submit">Log In</button>
      <span>or</span>
      <button className='login-form-button' onClick={() => setDemoUser()} type="submit">Login with Demo User</button>
    </form>
    </div>
  );
}

export default LoginForm;
