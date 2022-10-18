// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton ({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

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
    };

    return (
     <>
        <button onClick={openMenu}>
            <i className="fa-solid fa-user"></i>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink to='/spots/current'>MyListings</NavLink>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
     </>
    )
}

export default ProfileButton;
