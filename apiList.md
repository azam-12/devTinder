# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- Post /logout

## profileRouter
- GET /profile
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accetped/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile requests of other users on the platform



Status: ignored, interested, accepted, rejected

