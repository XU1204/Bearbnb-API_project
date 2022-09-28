const express = require('express');
const sequelize = require('sequelize');
const { Spot, Review ,SpotImage, User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth')

const router = express.Router();

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
                avgRating: average.avgRating,
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
router.get('/current', restoreUser,
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
router.post('/', restoreUser)

module.exports = router;
