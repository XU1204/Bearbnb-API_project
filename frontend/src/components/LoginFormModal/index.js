import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import styles from './login.module.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
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

  const handleCancel = () => {
    setCredential('');
    setPassword('')
    setErrors([])
    setShowModal(false)
  }


  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.container}>
            <div className={styles.titleWrapper}>
              <button onClick={handleCancel}><i class="fa-solid fa-xmark"></i></button>
              <h3>Log in</h3>
              <button>Sign up</button>
            </div>
            <form onSubmit={handleSubmit}>
              <p style={{textAlign: 'left', fontSize: '26px'}}><strong>Welcome to Bearbnb</strong></p>
              <div className={styles.error}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </div>
              <div className={styles.inputContainer}>
                    <label htmlFor='email'>Username or Email<span style={{color: 'red'}}>*</span></label>
                    <input
                      type="text"
                      name='email'
                      placeholder='Username or Email'
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      required
                    />
              </div>
              <div className={styles.inputContainer}>
                    <label htmlFor='password'>Password<span style={{color: 'red'}}>*</span></label>
                    <input
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
              </div>
              <button className={styles.continue} type="submit">Continue</button>
              {/* draw a horizontal line with text */}
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <div style={{flex: 1, height: '1px', backgroundColor: 'grey'}} />
                      <div>
                        <p style={{width: '40px', textAlign: 'center'}}>OR</p>
                      </div>
                      <div style={{flex: 1, height: '1px', backgroundColor: 'grey'}} />
                    </div>
              <button className={styles.demo} onClick={() => setDemoUser()} type="submit">Continue with Demo User</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
