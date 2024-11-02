# Dev Tinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password
- PATCH /profile/paaswordreset

## Use these while sending request

conectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- ## Use these for Accepting Request
- POST /request/review/accepted/:requestId
- POST /request/review/accepted/:requestId

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

# Pagination

- feed?page=1&limit=10 -> user 1-10 .skip(0) & .limit(10)
- feed?page=2&limt=10 -> user 11-20 .skip(10) & .limit(10)
- feed?page=3&limt=10 -> user 21-30 .skip(20) & .limit(10)

Status: ignore, interested, accepted, rejected
