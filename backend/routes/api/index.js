// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./users')
const spotRouter = require('./spots')
const reviewRouter = require('./reviews')
const BookingRouter = require('./bookings')
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const { Spot, Review, ReviewImage ,SpotImage, User } = require('../../db/models');


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.use('/spots', spotRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', BookingRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
});


//Delete a Spot Image
router.delete('/spot-images/:imageId', restoreUser, requireAuth,
  async(req, res) => {
    const image = await SpotImage.findByPk(req.params.imageId);
    if (!image) {
      res.status(404);
      res.json({
          message: "Spot image couldn't be found",
          statusCode: 404
      })
    };

    const spot = await Spot.findByPk(image.spotId);
    if (spot.ownerId !== req.user.id) {
      res.status(403);
      return res.json(
          {
              "message": "Forbidden",
              "statusCode": 403
          }
      )
    }

    await image.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
)


//Delete a Review Image
router.delete('/review-images/:imageId', restoreUser, requireAuth,
  async(req, res) => {
    const image = await ReviewImage.findByPk(req.params.imageId);
    if (!image) {
      res.status(404);
      res.json({
          message: "Review image couldn't be found",
          statusCode: 404
      })
    };

    const review = await Review.findByPk(image.reviewId);
    if (review.userId !== req.user.id) {
      res.status(403);
      return res.json(
          {
              "message": "Forbidden",
              "statusCode": 403
          }
      )
    }

    await image.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
)

module.exports = router;
