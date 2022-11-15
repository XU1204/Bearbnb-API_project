import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSpot, addImageToSpot, getDetails } from '../../store/spots'
import './CreateForm.css'

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
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  //
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState('yes');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data1 = {
        address, city, state, country, name, description, price
    }
      //console.log(1)

    const data2 = {
        url,
        preview: preview === 'yes'? true : false
    }

    const  createdSpot = await dispatch(addSpot(data1))
    .catch(async (res) => {
    const data = await res.json();
    //console.log('data--', data)
    if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
    });

    if (createdSpot) {
        setErrors([])
        //const spot = await dispatch(getDetails(createdSpot.id))
        dispatch(addImageToSpot(createdSpot.id, data2))
        //console.log('createdspot:', createdSpot)
        //console.log('spot------', spot)
        history.push(`/spots/${createdSpot.id}`)
    }

    // return dispatch(addSpot(data1))
    // .then((spot) => addImageToSpot(spot, data2))
    //     .catch(async (res) => {
    //     const data = await res.json();
    //     //console.log('data--', data)
    //     if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
    //     });
  }

  return (
    <div className='create-spot-form-container'>
    <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
            Address:
            <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
        </label>
        <label>
            City:
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            />
        </label>
        <label>
            State:
            <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
            />
        </label>
        <label>
            Country:
            <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
        </label>
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
        <label>
            Name:
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </label>
        <label>
            Description:
            <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </label>
        <label>
            Price:
            <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
        </label>

        <label>
            Image Url:
            <input
                type='url'
                value={url}
                placeholder={"https://example.com"}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
        </label>
        <div className='preview-container'>
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
        </div>

            <button id='create-spot-form-button' type='submit'>Create new spot</button>
    </form>
    </div>
  );
}

export default CreateSpotForm;
