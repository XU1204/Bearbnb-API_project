import { useSelector } from 'react-redux';
import Maps from './Maps';
import './maps.css';

const MapContainer = ({ setQuery, setCenter, center }) => {
    const key = useSelector((state) => state.mapState.key);

    if (!key) {
        return null;
    }

    return (
        <div className='home-page-map-container'>
            <Maps apiKey={key} setQuery={setQuery} setCenter={setCenter} center={center} />
        </div>
    );
};

export default MapContainer;
