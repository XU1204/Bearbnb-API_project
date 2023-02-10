import React from 'react'
import { useSelector } from 'react-redux'
import PriceFilter from './PriceFilter'
import LocationFilter from './LocationFilter'
import MyButton from '../../Booking/MyButton'
import './searchForm.css'


export default function SearchForm({ hasSubmitted, setHasSubmitted, errors, setErrors, minPrice, setMinPrice, maxPrice, setMaxPrice, minLat, setMinLat, maxLat, setMaxLat, minLng, setMinLng, maxLng, setMaxLng, setCenter, center }) {
  // const key = useSelector((state) => state.maps.key);

  // if (!key) {
  //   return null;
  // }

  return (
    <div className='search-drop-down'>
      {/* <LocationFilter apiKey={key} hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minLat={minLat} setMinLat={setMinLat} maxLat={maxLat} setMaxLat={setMaxLat} minLng={minLng} setMinLng={setMinLng} maxLng={maxLng} setMaxLng={setMaxLng} setCenter={setCenter} center={center} /> */}
      <PriceFilter hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} errors={errors} setErrors={setErrors} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      <MyButton name="Search" ></MyButton>
    </div>
  )
}
