const express = require('express');
const { Op } = require('sequelize');
const { sequelize, Spot, Review ,SpotImage, User, ReviewImage, Booking} = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCreate = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required.'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required.'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal({isDecimal: true})
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal({isDecimal: true})
        .withMessage("Longtitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters.'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required.'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required.'),
    handleValidationErrors
  ];


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


const validateBooking = [
    check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('StartDate is required.'),
    check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('EndDate is required.'),
    handleValidationErrors
]

const validateQuery = [
    check('page')
    .optional({checkFalsy: true})
    .isInt({min: 1, max: 20})
    .withMessage("Page must be greater than or equal to 1"),
    check('size')
    .optional({checkFalsy: true})
    .isInt({min: 1, max: 20})
    .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
    .optional({checkFalsy: true})
    .isDecimal({ checkFalsy: true })
    .withMessage("Maximum latitude is invalid"),
    check('minLat')
    .optional({checkFalsy: true})
    .isDecimal({ checkFalsy: true })
    .withMessage("Minimum latitude is invalid"),
    check('maxLng')
    .optional({checkFalsy: true})
    .isDecimal({ checkFalsy: true })
    .withMessage("Maximum longtitude is invalid"),
    check('minLng')
    .optional({checkFalsy: true})
    .isDecimal({ checkFalsy: true })
    .withMessage("Minimum longtitude is invalid"),
    check('minPrice')
    .optional({checkFalsy: true})
    .isDecimal({checkFalsy: true})
    .withMessage("Minimum price is invalid"),
    check('maxPrice')
    .optional({checkFalsy: true})
    .isDecimal({ checkFalsy: true})
    .withMessage("Maximum price is invalid"),
    handleValidationErrors
]

//GET all spots
router.get('/', validateQuery,
    async (req, res, _next) => {
        //Add Query Filters to Get All Spots
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        page = parseInt(page);
        size = parseInt(size);
        if (!page || page <= 0) page = 1;
        if (!size || size <= 0) size = 20;
        if (minPrice < 0) {
            res.status(400);
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    "minPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        if (maxPrice < 0) {
            res.status(400);
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    "maxPrice": "Maximum price must be greater than or equal to 0"
                }
            })
        }

        let where = {};
        if (minLat && maxLat) where.lat = { [Op.between]: [minLat, maxLat]}
        else if (minLat) where.lat = { [Op.gte]: minLat};
        else if (maxLat) where.lat = { [Op.lte]: maxLat};
        if (minLng && maxLng) where.lng = { [Op.between ]: [minLng, maxLng]}
        else if (minLng) where.lng = { [Op.gte]: minLng};
        else if (maxLng) where.lng = { [Op.lte]: maxLng};
        if (minPrice && maxPrice) where.price = { [Op.between ]: [minPrice, maxPrice]}
        else if (minPrice) where.price = { [Op.gte]: minPrice};
        else if (maxPrice) where.price = { [Op.lte]: maxPrice};

        const allSpots = await Spot.findAll({
            where,
            include: {
                model: SpotImage,
                attributes: ['url']
            }
        });

        const payload = [];

        for (let spot of allSpots) {
            const average = await Review.findAll({
                where:  { spotId: spot.id },
                attributes: [
                    [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                    ],
                raw: true
            });

            let previewImage;
            if (spot.SpotImages.length === 0) {
                previewImage = null
            } else {
                previewImage = spot.SpotImages[0].url
            };

            const spotsData = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: average[0].avgRating,
                previewImage
            }
            payload.push(spotsData)
        };

        return res.json({
            Spots: payload,
            page,
            size
        })
    }
)

//Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth,
    async (req, res) => {
    const { user } = req;
    const allSpots = await Spot.findAll({
        where: {ownerId: user.id},
        include: {
            model: SpotImage,
            attributes: ['url']
        }
    });
    const payload = [];

    for (let spot of allSpots) {
        const average = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ],
            raw: true
        });

        let previewImage;
        if (spot.SpotImages.length === 0) {
            previewImage = null
        } else {
            previewImage = spot.SpotImages[0].url
        };

        const spotsData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: average[0].avgRating,
            previewImage
        }
        payload.push(spotsData)
    };

    return res.json({
        Spots: payload
    })
})


//Get details of a Spot from an id
router.get('/:spotId', async(req, res) => {
    const  spotId  = req.params.spotId;
    const singleSpot = await Spot.findByPk(spotId, {
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
    });

    if (!singleSpot) {
        res.status(404);
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    }

    const numReviews = await Review.count({
        where: {spotId}
    });
    const totalStars = await Review.sum('stars', {
        where: {spotId}
    });
    const avgStarRating = totalStars/numReviews;

    const ownerId = singleSpot.ownerId
    const getOwner = await User.findOne({
        where: {id: ownerId},
        attributes: ['id', 'firstName', 'lastName']
    });

    const payload = [{
        id: singleSpot.id,
        ownerId: singleSpot.ownerId,
        address: singleSpot.address,
        city: singleSpot.city,
        state: singleSpot.state,
        country: singleSpot.country,
        lat: singleSpot.lat,
        lng: singleSpot.lng,
        name: singleSpot.name,
        description: singleSpot.description,
        price: singleSpot.price,
        createdAt: singleSpot.createdAt,
        updatedAt: singleSpot.updatedAt,
        numReviews,
        avgStarRating,
        SpotImages: singleSpot.SpotImages,
        owner: getOwner
    }];

    return res.json(payload);
})


//Create a Spot
router.post('/', restoreUser, requireAuth, validateCreate,
    async(req, res) => {
        const { user } = req;
        let { address, city, state, country, lat, lng, name, description, price } = req.body;
        price = Number(price);
        lat = Number(lat);
        lng = Number(lng);

        const newSpot = await Spot.create({
            ownerId: user.id,
            address, city, state, country, lat, lng, name, description, price
        });

        return res.json(newSpot)
    }
)


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth,
    async (req, res) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                  }
            )
        };
        if (spot.ownerId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }

        const { url, preview } = req.body;
        const newSpotImage = await SpotImage.create({
            spotId, url, preview
        });

        return res.json({
            id: newSpotImage.id,
            url: newSpotImage.url,
            preview: newSpotImage.preview
        })
    }
)


//Edit a Spot
router.put('/:spotId', restoreUser, requireAuth, validateCreate,
    async (req, res) => {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                  }
            )
        };
        if (spot.ownerId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }

        const { user } = req;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        spot.update({
            ownerId: user.id,
            address, city, state, country, lat, lng, name, description, price
        });

        return res.json(spot)
    }
)


//Delete a Spot
router.delete('/:spotId', restoreUser, requireAuth,
    async (req, res) => {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        };
        if (spot.ownerId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }

        else await spot.destroy();

        return res.json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    }
)


//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404);
        return res.json(
            {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        )
    };
    const reviews = await Review.findAll({
        where: {spotId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    return res.json(reviews);
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview,
    async(req, res) => {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        };

        const ifExist = await Review.findOne({
            where: {spotId, userId: req.user.id}
        });
        if (ifExist) {
            res.status(403);
            return res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        }

        const { review, stars } = req.body;
        const newReview = await Review.create({
            spotId,
            userId: req.user.id,
            review,
            stars
        });
        return res.json(newReview)
    }
)


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', restoreUser, requireAuth,
    async(req, res) => {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        };
        if (spot.ownerId !== req.user.id) {
            const bookings = await Booking.findAll({
                where: {spotId},
                attributes: ['spotId', 'startDate', 'endDate']
            });
            return res.json(bookings)
        };
        if (spot.ownerId === req.user.id) {
            const bookings = await Booking.findAll({
                where: {spotId},
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });
            return res.json(bookings);
        }

    }
)


//Create a Booking from a Spot based on the Spot's id
const compareDate = (start, end) => {
    let startYear = start.slice(0, 4);
    let startMonth = start.slice(5, 7);
    let startDay = start.slice(8);
    let endYear = end.slice(0, 4);
    let endMonth = end.slice(5, 7);
    let endDay = end.slice(8);
    if (startYear > endYear) return false;
    else if (startMonth > endMonth) return false;
    else if (startDay >= endDay) return false;
    else return true;
}
router.post('/:spotId/bookings', restoreUser, requireAuth, validateBooking,
    async(req, res) => {
        const spotId = parseInt(req.params.spotId);
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            return res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                }
            )
        };
        const { startDate, endDate } = req.body;
       if(!compareDate(startDate, endDate)) {
            res.status(400);
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                    }
            })
        };

        const ifExist1 = await Booking.findOne({
            where: {
                spotId,
                startDate: { [Op.substring]: startDate }
            },
        });
        const ifExist2 = await Booking.findOne({
            where: {
                spotId,
                endDate: { [Op.substring]: endDate }
            },
        })
        if (ifExist1) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking"
                }
            })
        };
        if (ifExist2) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        const newBooking = await Booking.create({
            spotId,
            userId: req.user.id,
            startDate,
            endDate
        });
        return res.json(newBooking)
    }
)


module.exports = router;
