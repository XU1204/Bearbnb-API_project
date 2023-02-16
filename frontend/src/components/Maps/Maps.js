import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const Maps = ({ apiKey, setQuery, center }) => {
    const history = useHistory();

    const [libraries] = useState(['places']);
    const [mapref, setMapRef] = React.useState(null);

    const handleOnLoad = map => {
        setMapRef(map);
    };

    const handleCenterChanged = () => {
        if (mapref) {
            const newBound = mapref.getBounds();
            const newCenter = mapref.getCenter();

            if (newCenter.lat() === center.lat && newCenter.lng() === center.lng) return;

            setQuery(query => {
                const newQuery = {}
                newQuery.minLat = newBound.getSouthWest().lat();
                newQuery.maxLat = newBound.getNorthEast().lat();
                newQuery.minLng = newBound.getSouthWest().lng();
                newQuery.maxLng = newBound.getNorthEast().lng();

                return newQuery;
            });
        }
    };

    const spots = useSelector(state => state.spotState.allSpots);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries
    });

    if (!spots) return null;
    let spotsArr;
    if (spots) spotsArr = Object.values(spots);

    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    // console.log('----------center---------', center)

    return (
        <div className='google-map'>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                    onLoad={handleOnLoad}
                    onCenterChanged={handleCenterChanged}
                >
                {spotsArr && spotsArr.map(spot => {
                    return (
                        <div key={spot.id} className='overlay-container'>
                            <OverlayView
                                position={{ lat: spot.lat, lng: spot.lng }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <button onClick={() => handleClick(spot.id)} className='overlay-button'>${parseFloat(spot.price).toFixed(0).toLocaleString()}</button>
                            </OverlayView>
                        </div>
                    )
                })}
                </GoogleMap>
            )}
        </div>
    );
};

export default React.memo(Maps);
