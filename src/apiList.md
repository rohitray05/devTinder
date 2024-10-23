# Dev Tinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Use these while sending request

conectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- ## Use these for Accepting Request
- POST /request/review/accepted/:requestId
- POST /request/review/accepted/:requestId

- GET /user/connections
- GET /user/requests/received
- GET /user/feeds

Status: ignore, interested, accepted, rejected
