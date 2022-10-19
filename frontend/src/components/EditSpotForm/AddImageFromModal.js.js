import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImageToSpot, getDetails } from '../../store/spots'
import { Modal } from '../../context/Modal';

function AddImageFormModal({spot}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState('yes');
    const [errors, setErrors] = useState([]);

    const spot2 = useSelector(state => state.spotState[spot.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(getDetails(spot.id))

        const data = {
            url,
            preview: preview === 'yes'? true : false
        }

        let newImageObj;
        try {
            newImageObj = await dispatch(addImageToSpot(spot2, data))
        } catch (error) {
            setErrors(error)
        }

        if (newImageObj) {
            setErrors([])
            history.push(`/spots/${spot2.id}`)
        }
    };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Image</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
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
                <legend>Preview:</legend>
                <div>
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
                <button type='submit'>Submit</button>
            </form>
        </Modal>
      )}
    </>
  );
}


export default AddImageFormModal;
