import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { updateReview } from '../../store/reviews';
import MyButton from '../Booking/MyButton';
import styles from '../CreateSpotForm/CreateForm.module.css'

function EditReviewFormModal ({eachreview}) {
    console.log(11111111111, 'each review', eachreview.review)
    const dispatch = useDispatch();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [review, setReview] = useState(eachreview.review);
    const [stars, setStars] = useState(eachreview.stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        console.log(22222222222)

        e.prevdenDefault();

        //  add error handling
        let errors = []
        if (review.length > 254) errors.push('Review must be less than 255 characters.')
        if (review.trim().length === 0) errors.push('Review should not contain only spaces.')
        setErrors(errors)
        if (errors.length) {
            return;
        }

        const payload = {
            review, stars
        }


        // return await dispatch(updateReview(eachreview.id, payload))
        // .then(() => {
        //     setStars(stars)
        //     setReview(review)
        //     setShowModal(false)
        //     setErrors([])
        //     history.push('/reviews/current')
        // })
        // .catch(async (res) => {
        //         const errorData = await res.json();
        //         if (errorData && (errorData.errors || errorData.message)) setErrors([errorData.errors? errorData.errors : errorData.message]);
        //     })
        let id = eachreview.id
            const newReview = await dispatch(updateReview(id, payload))
            .catch(async (res) => {
            const data = await res.json();
            if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
            });

            if (newReview) {
                setErrors([])
                history.push('/reviews/current')
                setStars(stars)
                setReview(review)
                setShowModal(false)
            }
    }

    return (
        <>
          <button onClick={() => setShowModal(true)}>Edit a review</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                  <form onSubmit={handleSubmit} id={styles.writeReviewForm}>
                    <div className={styles.error}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </div>
                    <div className={styles.inputContainer}>
                        <label id={styles.star}>Stars: </label>
                        <input
                            type='number'
                            value={stars}
                            placeholder={eachreview.stars}
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
                            placeholder={eachreview.review}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </div>
                    <MyButton name='Submit' disabled={false} />
                </form>
            </Modal>
            )}
        </>
    )
}

export default EditReviewFormModal;
