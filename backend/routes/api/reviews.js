const express = require('express');
const sequelize = require('sequelize');
const { Spot, Review, ReviewImage ,SpotImage, User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
];


//Get all Reviews of the Current User
router.get('/current', restoreUser, requireAuth,
    async(req, res) => {
        const reviews = await Review.findAll({
            where: {userId: req.user.id},
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: {
                        model: SpotImage,
                        attributes: ['url']
                    }
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })

        const reviewList = [];
        //reviews is an array of promises, it cannot be manipulated, so we have to
        //convert it to json first, then we can manipulate the array
        reviews.forEach(review => {
            reviewList.push(review.toJSON())
        })
        reviewList.forEach(review => {
            review.Spot.SpotImages.forEach(img => {
                review.Spot.previewImage = img.url;
            })
            delete review.Spot.SpotImages
        });

        res.json({
            Reviews: reviewList
        })
    }
)


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser, requireAuth,
    async(req, res) => {
        const reviewId = req.params.reviewId;
        const review = await Review.findByPk(reviewId)
        if (!review) {
            res.status(404);
            res.json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        if (review.userId !== req.user) {
            res.status(403);
            res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }

        const numImages = await ReviewImage.count({where: {reviewId}})
        if (numImages >= 10) {
            res.status(403);
            res.json({
                message: "Maximum number of images for this resource was reached",
                statusCode: 403
            })
        }

        const { url } = req.body;
        const newReviewImage = await ReviewImage.create({ reviewId, url });
        res.json({
            id: newReviewImage.id,
            url: newReviewImage.url
        })
    }
)


//Edit a Review
router.put('/:reviewId', restoreUser, requireAuth, validateReview,
    async(req, res) => {
        const reviewId = req.params.reviewId;
        const targetReview = await Review.findByPk(reviewId)
        if (!targetReview) {
            res.status(404);
            res.json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
        if (targetReview.userId !== req.user.id) {
            res.status(403);
            res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }

        const { review, stars } = req.body;
        targetReview.update({ review, stars })
        res.json(targetReview);
    }
)


//Delete a Review
router.delete('/:reviewId', restoreUser, requireAuth,
    async(req, res) => {
        const reviewId = req.params.reviewId;
        const targetReview = await Review.findByPk(reviewId)
        if (!targetReview) {
            res.status(404);
            res.json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
        if (targetReview.userId !== req.user.id) {
            res.status(403);
            res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }
        await targetReview.destroy();
        res.json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    }
)









module.exports = router;
