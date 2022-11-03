// frontend/src/components/Navigation/index.js
import React from 'react'
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'


function Navigation ({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='nav-button'>
                <ProfileButton user={sessionUser} />
            </div>

        );
    } else {
        sessionLinks = (
            <div className='nav-button'>
             <LoginFormModal />
             <NavLink to='/signup'><button id='sign-up-button'>Sign Up</button></NavLink>
            </div>
        )
    }

    return (
        <div className='nav'>
            <NavLink exact to='/'>
                <img id='bearbnb' src='https://pbs.twimg.com/media/BstWqTHCEAMhHBc?format=jpg&name=900x900' alt='BearBnb'/>
            </NavLink>
            {isLoaded && sessionLinks}
        </div>
    )

}

export default Navigation;
