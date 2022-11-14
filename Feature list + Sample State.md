# Feature List
BearBnb, an Airbnb clone, is a website where you can find stays anytime, anywhere.

1. New account creation, login, and guest/demo login
Users can sign up, sign in, log out
Users can use a demo login to try the site
Users can't create, update, reserve, or destroy listings without login in

2. Listings
Create, Read, Update, and Delete listings

3. Reviews
Implement reviews functionality
Logged-in Users can create, update, or delete reviews


# Redux State Shape
```json
{
  "spotState": {
    "allSpots": {
        "1": {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 4.5,
          "previewImage": "image url"
        }
    },
    "singleSpot": {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,
        "numReviews": 5,
        "avgStarRating": 4.5,
        "SpotImages": [
            {
            "id": 1,
            "url": "image url",
            "preview": true
            },
            {
            "id": 2,
            "url": "image url",
            "preview": false
            }
        ],
        "Owner": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
            }
        }
    },
    "reviewState": {
        "1": {
          "id": 1,
          "userId": 1,
          "spotId": 1,
          "review": "This was an awesome spot!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ],
        }
    },
    "session": {
        "user": {
            "email":"demo@user.io",
            "firstName": "Jennifer",
            "id": 1,
            "lastName": "Smith",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkRlbW8tbGl0aW9uIiwiZW1haWwiOiJkZW1vQHVzZXIuaW8ifSwiaWF0IjoxNjY4MjE1OTI1LCJleHAiOjE2Njg4MjA3MjV9.t4RAB2Szgt1hOvzXKjOqnp8FTmmNnInYkyzMNnI03BI",
            "username": "Demo-lition"
        }
    }
}
```
