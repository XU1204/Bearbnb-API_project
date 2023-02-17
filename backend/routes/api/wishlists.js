const express = require('express');
const { Spot, User, Wishlist } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get all wishlists of the Current User
router.get('/current', restoreUser, requireAuth,
    async(req, res) => {
        const wishlists = await Wishlist.findAll({
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
                    }
                }
            ]
        })

        const wishArr = [];
        wishlists.forEach(wish => {
            wish.Spot.SpotImages.forEach(img => {
                if (img.preview === true && !wish.Spot.previewImage ) {
                    wish.Spot.previewImage = img.url;
                }
            })
            if (!wish.Spot.previewImage ) {
                wish.Spot.previewImage = 'No available preview images.'
            }
            delete wish.Spot.SpotImages
        });

        return res.json({
            Wishes: wishArr
        })
    }
)


//Delete a wishlist
router.delete('/:wishId', restoreUser, requireAuth,
    async(req, res) => {
        const wishId = req.params.wishId;
        const targetWish = await Wishlist.findByPk(wishId)
        if (!targetWish) {
            res.status(404);
            return res.json({
                message: "Wishlist couldn't be found",
                statusCode: 404
            })
        }
        if (targetWish.userId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        }
        await targetWish.destroy();
        return res.json(
            {
                "message": "Successfully deleted",
                "statusCode": 200
            }
        )
    }
)

module.exports = router;
