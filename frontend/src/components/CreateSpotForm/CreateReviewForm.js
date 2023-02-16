import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { createReviewOfSpot, getReviewsOfSpot } from '../../store/reviews';
import { getDetails } from '../../store/spots';
import MyButton from '../Booking/MyButton';
import styles from './CreateForm.module.css'

function CreateReviewFormModal ({id}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);

    const reviews = useSelector(state => state.reviewState);

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, reviews])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //  add error handling
        let errors = []
        if (review.length > 254) errors.push('Review must be less than 255 characters.')
        if (review.trim().length === 0) errors.push('Review should not contain only spaces.')
        setErrors(errors)
        if (errors.length) {
            return;
        }


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
            <form onSubmit={handleSubmit} id={styles.writeReviewForm}>
                <div className={styles.error}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className={styles.inputContainer}>
                    <label id={styles.star}>Stars: </label>
                    <input
                        type='number'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        min='1'
                        max='5'
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Review:</label>
                    <textarea
                        id={styles.description}
                        type='text'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <MyButton name='Submit' disabled={false} />

          </form>
        )
    }

    return (
        <>
          <button id={styles.writeReviewBtn} onClick={() => setShowModal(true)}>Write a review</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                {content}
            </Modal>
          )}
        </>
      );
}

export default CreateReviewFormModal;
