import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { updateReview } from '../../store/reviews';

function EditReviewFormModal ({eachreview}) {
    console.log(1, 'each review', eachreview)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState(eachreview.review);
    const [stars, setStars] = useState(eachreview.stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        //e.prevdenDefault();
        const data = {
            review, stars
        }
        console.log(2)
        return dispatch(updateReview(eachreview.id, data))
        // .then(() => {
        //     setErrors([])
        //     //console.log('updatedspot:', updatedSpot)
        //     history.push(`/reviews/current`)
        // })
        .catch(async (res) => {
            const errorData = await res.json();
            if (data && (errorData.errors || errorData.message)) setErrors([errorData.errors? errorData.errors : errorData.message]);
        })

    }

    return (
        <>
          <button onClick={() => setShowModal(true)}>Edit a review</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                 <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            <label>
                Review:
                <input
                    type='text'
                    value={review}
                    placeholder={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
                Stars:
                <input
                    type='number'
                    value={stars}
                    placeholder={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Update Review</button>
          </form>
            </Modal>
            )}
        </>
    )
}

export default EditReviewFormModal;
