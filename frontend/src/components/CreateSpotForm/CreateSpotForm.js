import React from 'react'
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'

const CreateSpotForm = () => {
    const sessionUser = useSelector(state => state.session.user);


    if (sessionUser) {
        createLinks = (
            <button></button>
        )
}
