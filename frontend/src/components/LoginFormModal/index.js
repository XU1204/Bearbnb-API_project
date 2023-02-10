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

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password2, setPassword2] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors2, setErrors2] = useState([]);

  const [signup, setSignup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    if (signup) {
      const errorsArr = []
      if (username.length > 39) {
        errorsArr.push("Username must be less than 40 characters")
      }
      if (email.length > 254) {
        errorsArr.push("Email length must be less than 255 characters")
      }
      if (password2.length > 30) {
        errorsArr.push("Password length must be less than 30 characters")
      }
      if (password2 !== confirmPassword){
        errorsArr.push("Passwords do not match")
      }
      if (errorsArr.length) {
        setErrors2(errorsArr)
        return;
      }

      if (password2 === confirmPassword) {
        setErrors2([]);
        return dispatch(sessionActions.signup({firstName, lastName, email, username, password2}))
         .catch(async (res) => {
            const data = await res.json();
            if (data && typeof data.errors === 'object') {
                setErrors2(Object.values(data.errors))
            }
            else if (data && data.errors) setErrors2(data.errors)
         });
      }
      return setErrors2(['Confirm Password field must be the same as the Password field']);
    }

    else {
      return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
  }

  const setDemoUser = () => {
    setCredential('Demo-lition');
    setPassword('password')
  }

  const handleCancel = () => {
    setEmail('')
    setUsername('')
    setFirstName('')
    setLastName('')
    setPassword2('')
    setConfirmPassword('')
    setErrors2([])

    setCredential('');
    setPassword('')
    setErrors([])

    setShowModal(false)
  }

  const handleSwitch = () => {
    if (signup) setSignup(false)
    else setSignup(true)
  }


  return (
    <>
      <button onClick={() => setShowModal(true)} id={styles.begin}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.container}>
            <div className={styles.titleWrapper}>
              <button onClick={handleCancel} id={styles.cancelBtn}><i class="fa-solid fa-xmark"></i></button>
              <h3>{signup? 'Sign up' : 'Log in'}</h3>
              <button className={styles.changeBtn} onClick={handleSwitch}>{signup? 'Log in' : 'Sign up'}</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <p style={{textAlign: 'left', fontSize: '26px'}}><strong>Welcome to Bearbnb</strong></p>
              {!signup && (
                <>
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
                  </>
              )}
               {signup && (<>
                  <div className={styles.error}>
                    {errors2.map((error, idx) => <li key={idx}>{error}</li>)}
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='email'>Email<span style={{color: 'red'}}>*</span></label>
                      <input
                        type="text"
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='email'>Username<span style={{color: 'red'}}>*</span></label>
                      <input
                        type="text"
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='firstname'>First Name<span style={{color: 'red'}}>*</span></label>
                      <input
                        type="text"
                        name='firstname'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='lastname'>Last Name<span style={{color: 'red'}}>*</span></label>
                      <input
                        type="text"
                        name='lastname'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='password2'>Password<span style={{color: 'red'}}>*</span></label>
                      <input
                        name='password2'
                        type='password'
                        placeholder='Password'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.inputContainer}>
                      <label htmlFor='confirm'>Confirm Password<span style={{color: 'red'}}>*</span></label>
                      <input
                        name='confirm'
                        type='confirm'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                  </div>
                  <button className={styles.continue} type="submit">Register</button>
               </>)}
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
