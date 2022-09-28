const express = require('express');
const sequelize = require('sequelize');
const { Spot, Review ,SpotImage, User } = require('../../db/models');
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

//GET all spots
router.get('/',
    async (_req, res, _next) => {
        const allSpots = await Spot.findAll({
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
            })
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
                previewImage: spot.SpotImages[0].url
            }
            payload.push(spotsData)
        };

        return res.json({
            Spots: payload
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
        const average = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")),"avgRating"]
                ],
            raw: true
        })
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
            avgRating: average.avgRating,
            previewImage: spot.SpotImages[0].url
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
        res.json(
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
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await Spot.create({
            ownerId: user.id,
            address, city, state, country, lat, lng, name, description, price
        });

        res.json(newSpot)
    }
)


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth,
    async (req, res) => {
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.status(404);
            res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                  }
            )
        };
        if (spot.ownerId !== req.user.id) {
            res.status(403);
            res.json(
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

        res.json({
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
            res.json(
                {
                    "message": "Spot couldn't be found",
                    "statusCode": 404
                  }
            )
        };
        if (spot.ownerId !== req.user.id) {
            res.status(403);
            res.json(
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

        res.json(spot)
    }
)


//Delete a Spot



module.exports = router;
