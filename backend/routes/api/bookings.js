const express = require('express');
const { Spot,SpotImage, User, Booking} = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateBooking = [
    check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('StartDate is required.'),
    check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('EndDate is required.'),
    handleValidationErrors
]

//Get all of the Current User's Bookings
router.get('/current', restoreUser, requireAuth,
    async(req, res) => {
        const { user } = req;
        const bookings = await Booking.findAll({
            where: {userId: user.id},
            include: [
                {
                    model: Spot,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: SpotImage,
                    }
                }
            ]
        })

        const bookingList = [];
        bookings.forEach(Booking => {
            bookingList.push(Booking.toJSON())
        })
        bookingList.forEach(booking=> {
            booking.Spot.SpotImages.forEach(img => {
                if (img.preview === true && !booking.Spot.previewImage ) {
                    booking.Spot.previewImage = img.url;
                }
            })
            if (!booking.Spot.previewImage ) {
                booking.Spot.previewImage = 'No avaliable preview images.'
            }
            delete booking.Spot.SpotImages
        });
        // console.log('back bookings.js------', bookingList)
        return res.json({
            Bookings: bookingList
        })
    }
)


//Edit a Booking
const compareDate = (start, end) => {
    let startYear = Number(start.slice(0, 4));
    let startMonth = Number(start.slice(5, 7));
    let startDay = Number(start.slice(8));
    let endYear = Number(end.slice(0, 4));
    let endMonth = Number(end.slice(5, 7));
    let endDay = Number(end.slice(8));
    if (startYear > endYear) return false;
    else if (startYear === endYear && startMonth > endMonth) return false;
    else if (startYear === endYear && startMonth === endMonth && startDay >= endDay) return false;
    else return true;
}
const compareWithToday = (end) => {
    let current = new Date();
    let currentYear = current.getFullYear();
    let currentMonth = current.getMonth() + 1;
    let currentDay = current.getDate();
    let endYear = Number(end.slice(0, 4));
    let endMonth = Number(end.slice(5, 7));
    let endDay = Number(end.slice(8));
    if (currentYear > endYear) return false;
    else if (currentYear  === endYear && currentMonth > endMonth) return false;
    else if (currentYear === endYear && currentMonth === endMonth && currentDay >= endDay) return false;
    else return true;
}
router.put('/:bookingId', restoreUser, requireAuth, validateBooking,
    async(req, res) => {
        const bookingId = parseInt(req.params.bookingId);
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            res.status(404);
            return res.json(
                {
                    "message": "Booking couldn't be found",
                    "statusCode": 404
                }
            )
        };
        if (booking.userId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        };
        if (!compareWithToday(booking.endDate.toJSON())) {
            res.status(403);
            return res.json({
                message: "Past bookings can't be modified",
                statusCode: 403
            })
        }

        const { startDate, endDate } = req.body;
       if(!compareDate(startDate, endDate)) {
            res.status(400);
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot come before startDate"
                    }
            })
        };
        if (!compareWithToday(startDate) || !compareWithToday(endDate)) {
            res.status(403);
            return res.json({
                message: "Start date and end date must be future days.",
                statusCode: 403
            })
        }

        const allBookings = await Booking.findAll({ where: {id: bookingId}});
        const allBookingsList = [];
        allBookings.forEach(ele => {
            allBookingsList.push(ele.toJSON())
        });

        let start = false;
        let end = false;
        allBookingsList.forEach(singleBooking => {
            if (singleBooking.startDate.toJSON().includes(startDate) ) {
                start = true;
            }
            if (singleBooking.endDate.toJSON().includes(endDate)) {
                end = true;
            }
        })

        if (start) {
            res.status(403);
                return res.json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors: {
                            startDate: "Start date conflicts with an existing booking"
                        }
                });
        }
        else if (end) {
            res.status(403);
                return res.json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors: {
                            endDate: "End date conflicts with an existing booking"
                        }
                })
        }
        else {
            booking.update({ startDate, endDate });
            return res.json(booking)
        }
    }
)


//Delete a Booking
router.delete('/:bookingId', restoreUser, requireAuth,
    async(req, res) => {
        const bookingId = parseInt(req.params.bookingId);
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            res.status(404);
            return res.json(
                {
                    "message": "Booking couldn't be found",
                    "statusCode": 404
                }
            )
        };
        const spot = await Spot.findByPk(booking.spotId);
        if (booking.userId !== req.user.id  && spot.ownerId !== req.user.id) {
            res.status(403);
            return res.json(
                {
                    "message": "Forbidden",
                    "statusCode": 403
                }
            )
        };
        if (!compareWithToday(booking.startDate.toJSON())) {
            res.status(403);
            return res.json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
        }

        await booking.destroy();
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
)






module.exports = router;
