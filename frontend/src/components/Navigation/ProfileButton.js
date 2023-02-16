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
            <li><i className="fa-solid fa-user"></i>{user.username}</li>
            <li><i className="fa-solid fa-envelope"></i>{user.email}</li>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <div style={{flex: 1, height: '1px', backgroundColor: '#dddddd'}} />
            </div>
            <li className="ul-link">
              <i className="fa-solid fa-plane"></i>
              <NavLink style={{ color: 'black', textDecoration:'none'}} key='review' to='/bookings/current'><strong>Trips</strong></NavLink>
            </li>
            <li className="ul-link">
              <i className="fa-solid fa-house"></i>
              <NavLink style={{ color: 'black', textDecoration:'none'}} key='listing' to='/spots/current'><strong>Listings</strong></NavLink>
            </li>
            <li className="ul-link">
              <i className="fa-solid fa-pen-to-square"></i>
              <NavLink style={{ color: 'black', textDecoration:'none'}} key='review' to='/reviews/current'><strong>Reviews</strong></NavLink>
            </li>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <div style={{flex: 1, height: '1px', backgroundColor: '#dddddd'}} />
            </div>
            <li className="ul-link">
              <i className="fa-solid fa-right-from-bracket"></i>
              <button className='logout-button' id='logout-btn' onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
     </div>
    )
}

export default ProfileButton;
