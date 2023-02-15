import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSpot, addImageToSpot, getDetails } from '../../store/spots'
import MyButton from '../Booking/MyButton';
import styles from './CreateForm.module.css'

function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    //   const [lat, setLat] = useState(0);
    //   const [lng, setLng] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [errors, setErrors] = useState([]);

    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState('yes');

    const allSpots = useSelector(state => Object.values(state.spotState.allSpots));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // add error handling
        let errors = []
        if (price <= 0) errors.push('Price nust be greater than 0.');
        if (!url.startsWith('http://') && !url.startsWith('https://')) errors.push('Preview image url must starts with "http://" or "https://".');
        if (description.length > 254) errors.push('Description must be less than 255 characters.')
        if (name.length > 254) errors.push('Title must be less than 255 characters.')
        if (description.trim().length === 0) errors.push('Description should not contain only spaces.')
        if (name.trim().length === 0) errors.push('Title should not contain only spaces.')
        let imgEnd = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.svg']
        let count = 0
        for (let i = 0; i < 6; i++) {
            if (url.includes(imgEnd[i])) count++
        }
        if (count === 0) errors.push("Preview Image Url should contain '.jpg', '.jpeg', '.png', '.pdf', '.gif' or '.svg'.")

        setErrors(errors)
        // end add

        if (errors.length) {
            return;
        }

        const data1 = {
            address, city, state, country, name, description, price
        }

        const data2 = {
            url,
            preview: preview === 'yes'? true : false
        }

        if(data1.address && data1.city) {
            const isExist = allSpots.find(spot => spot.address.trim() === address.trim() && spot.city.trim() === city.trim());
            if (isExist)  setErrors(['The spot with the same address and city has already exist.'])
        }




        const  createdSpot = await dispatch(addSpot(data1))
        .catch(async (res) => {
        const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        else if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });

        if (createdSpot) {
            const isExist = allSpots.find(spot => spot.address.trim() === address.trim() && spot.city.trim() === city.trim());
            console.log('isExist:', isExist)
            if (isExist)  setErrors(['The spot with the same address and city has already exist.'])
            if (price <= 0) setErrors(['Price must be greater than 0.'])
            else {
                setErrors([]);
                dispatch(getDetails(createdSpot.id))
                dispatch(addImageToSpot(createdSpot.id, data2))
                history.push(`/spots/${createdSpot.id}`)
            }
        }
    }

  return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit}>
        <h1>Airbnb your home</h1>
        <div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div>
        <div className={styles.inputWrapper}>
            <label htmlFor='address'>Address<span style={{color: 'red'}}>*</span></label>
            <input
                name='address'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>City<span style={{color: 'red'}}>*</span></label>
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>State<span style={{color: 'red'}}>*</span></label>
            <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>Country<span style={{color: 'red'}}>*</span></label>
            <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
        </div>
            {/* <label>
                Latitude:
                <input
                    type='number'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
            </label>
            <label>
                Longtitude:
                <input
                    type='number'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                />
            </label> */}
        <div className={styles.inputWrapper}>
            <label>Name<span style={{color: 'red'}}>*</span></label>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>Description<span style={{color: 'red'}}>*</span></label>
            <textarea
                id={styles.description}
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>Price<span style={{color: 'red'}}>*</span></label>
            <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
        </div>
        <div className={styles.inputWrapper}>
            <label>Image url<span style={{color: 'red'}}>*</span></label>
            <input
                type='url'
                value={url}
                placeholder={"https://example.jpg"}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
        </div>
        {/* <div className='preview-container'>
            <legend id='preview-label'>Preview:</legend>
            <div id='preview-ture-false'>
                <label>
                    <input
                        type="radio"
                        value='yes'
                        checked={preview === 'yes'}
                        onChange={(e) => setPreview(e.target.value)}
                    />
                    true
                </label>
                <label>
                    <input
                        type="radio"
                        value='no'
                        checked={preview === 'no'}
                        onChange={(e) => setPreview(e.target.value)}
                    />
                    false
                </label>
            </div>
            </div> */}
            <MyButton name='Create new spot' disabled={false} />
            {/* <button id='create-spot-form-button' type='submit'>Create new spot</button> */}
    </form>
    </div>
  );
}


export default CreateSpotForm;
