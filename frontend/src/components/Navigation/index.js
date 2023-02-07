// frontend/src/components/Navigation/index.js
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'


function Navigation ({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <span>
                    <NavLink to='/spots'><button id='become-host-button'>Airbnb your home</button></NavLink>
                </span>
                    <i className="fa-solid fa-globe"></i>
                <div className='nav-button'>
                    <ProfileButton user={sessionUser} />
                </div>
            </>

        );
    } else {
        sessionLinks = (
            <div>
                <i className="fa-solid fa-globe"></i>
                <LoginFormModal />
            </div>
        )
    }

    return (
        <div className='nav'>
            <NavLink exact to='/'>
                <img id='bearbnb' src='https://pbs.twimg.com/media/BstWqTHCEAMhHBc?format=jpg&name=900x900' alt='BearBnb'/>
            </NavLink>
            <div className='nav-right-part'>
                {/* <span>
                    <NavLink to='/spots'><button id='become-host-button'>Airbnb your home</button></NavLink>
                </span>
                <i className="fa-solid fa-globe"></i> */}
                {isLoaded && sessionLinks}
            </div>
        </div>
    )

}

export default Navigation;
