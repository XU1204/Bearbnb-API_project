import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSpot } from '../../store/spots'

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        address, city, state, country, lat, lng, name, description, price
    }
      //console.log(1)
    //   let createdSpot;
    //   createdSpot = dispatch(addSpot(data))
    //   console.log('createdSpot', createdSpot)
    //   if (createdSpot) {
        // setErrors([]);
        // return dispatch(addSpot(data))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        //  });

    let createdSpot;
    try {
        createdSpot = await dispatch(addSpot(data))
    } catch (error) {
        setErrors(error)
    }

    if (createdSpot) {
        setErrors([])
        //console.log('createdspot:', createdSpot)
        history.push(`/spots/${createdSpot.id}`)
    }
      //return setErrors(['Invalid Input']);
  }

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
            <label>
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
            </label>
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
            <button type='submit'>Create new spot</button>
    </form>
  );
}

export default CreateSpotForm;
