// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton ({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    // const spots = useSelector(state => Object.values(state.spotState))
    // const spot = spots.find(spot => spot.ownerId === user.id)
    // if (spot) {
    //   const link =  (
    //     <NavLink to={`/api/spots/${spot.id}`}>
    //       My Listings
    //     </NavLink>
    //   )
    // }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
     <div>
        <button onClick={openMenu}>
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-user"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink style={{ color: 'black'}} key='listing' to='/spots/current'>My Listings</NavLink>
            </li>
            <li>
              <NavLink style={{ color: 'black'}} key='review' to='/reviews/current'>My Reviews</NavLink>
            </li>
            <li>
              <button id='logout-button' onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
     </div>
    )
}

export default ProfileButton;
