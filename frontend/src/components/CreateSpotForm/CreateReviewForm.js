import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { createReviewOfSpot, getReviewsOfSpot } from '../../store/reviews';
import { getDetails } from '../../store/spots';

function CreateReviewFormModal ({id}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);

    const reviews = useSelector(state => state.reviewState);

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, reviews])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data1 = {
            review, stars
        }

        const newReview = await dispatch(createReviewOfSpot(id, data1))
        .catch(async (res) => {
        const data = await res.json();
        if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });

        if (newReview) {
            setErrors([])
            history.push(`/spots/${id}`)
            setShowModal(false)
            setReview('');
            setStars(5)
        }
    }

    const sessionUser = useSelector(state => state.session.user);
    let content;
    if (!sessionUser) {
        content = (
            <label>You must login to write a review. </label>
        )
    } else {
        content = (
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            <label>
                Review:
                <input
                    type='text'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label id='create-review-star-label'>
                Stars:
                <input
                    type='number'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    min='1'
                    max='5'
                    required
                />
            </label>
            <button id='create-review-button' type='submit'>Submit</button>
          </form>
        )
    }

    return (
        <>
          <button id='write-review-button' onClick={() => setShowModal(true)}>Write a review</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                {content}
            </Modal>
          )}
        </>
      );
}

export default CreateReviewFormModal;
