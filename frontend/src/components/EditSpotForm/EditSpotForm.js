import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot, addImageToSpot } from '../../store/spots'
import './EditForm.css'

function EditSpotForm ({spot}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    // const [lat, setLat] = useState(spot.lat);
    // const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const [previewImage, setPreviewImage] = useState(spot.previewImage? spot.previewImage : 'none')

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState= (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    // const updateLat = (e) => setLat(e.target.value);
    // const updateLng = (e) => setLng(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const allSpots = useSelector(state => Object.values(state.spotState.allSpots));


    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = []
        if (price <= 0) errors.push('Price nust be greater than 0.');
        if (!previewImage.startsWith('http://') && !previewImage.startsWith('https://')) errors.push('Preview image url must starts with "http://" or "https://".');
        if (description.length > 254) errors.push('Description must be less than 255 characters.')
        if (name.length > 254) errors.push('Title must be less than 255 characters.')
        if (description.trim().length === 0) errors.push('Description should not contain only spaces.')
        if (name.trim().length === 0) errors.push('Title should not contain only spaces.')
        let imgEnd = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.svg']
        let count = 0
        for (let i = 0; i < 6; i++) {
            if (previewImage.includes(imgEnd[i])) count++
        }
        if (count === 0) errors.push("Preview Image Url should contain '.jpg', '.jpeg', '.png', '.pdf', '.gif' or '.svg'.")

        setErrors(errors)

        if (errors.length) return;

        const data = {
            id: spot.id,
            address, city, state, country, name, description, price
        }

        const data2 = {
            url: previewImage,
            preview: true
        }

        const updatedSpot = await dispatch(updateSpot(data))
        . catch (async(res) => {
            const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        else if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });

        const updatedImage = await dispatch(addImageToSpot(updatedSpot.id, data2))
        . catch (async(res) => {
            const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        else if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });


        if (updatedSpot || updatedImage) {
            const isExist = allSpots.find(spot => spot.address.trim() === address.trim() && spot.city.trim() === city.trim());
            if (isExist)  setErrors(['The spot with the same address and city has already exist.'])
            if (price <= 0) {
                setErrors(['Price must be greater than 0.'])
            }
            else {
                setErrors([])
                history.push(`/spots/${updatedSpot.id}`)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
            Address:
            <input
                type='text'
                value={address}
                placeholder={address}
                onChange={updateAddress}
                required
            />
        </label>
            <label>
                City:
                <input
                type="text"
                placeholder={city}
                value={city}
                onChange={updateCity}
                required
                />
            </label>
            <label>
                State:
                <input
                    type='text'
                    placeholder={state}
                    value={state}
                    onChange={updateState}
                    required
                />
            </label>
            <label>
                Country:
                <input
                    type='text'
                    placeholder={country}
                    value={country}
                    onChange={updateCountry}
                    required
                />
            </label>
            {/* <label>
                Latitude:
                <input
                    type='number'
                    placeholder={lat}
                    value={lat}
                    onChange={updateLat}
                    required
                />
            </label>
            <label>
                Longtitude:
                <input
                    type='number'
                    placeholder={lng}
                    value={lng}
                    onChange={updateLng}
                    required
                />
            </label> */}
            <label>
                Name:
                <input
                    type='text'
                    placeholder={name}
                    value={name}
                    onChange={updateName}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    type='text'
                    placeholder={description}
                    value={description}
                    onChange={updateDescription}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type='number'
                    placeholder={price}
                    value={price}
                    onChange={updatePrice}
                    required
                />
            </label>
            <div>
            <label>
                Add image:</label>
                <input
                    type='text'
                    placeholder={previewImage}
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                />
            </div>
            <button id='update-spot-button' type='submit'>Update Listing</button>
    </form>
    )


}

export default EditSpotForm;
