# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- Post /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
 we can club above 2 requests into one since only interested and ignored changes dynamically
- POST /request/send/:status/:userId


- POST /request/review/accetped/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile requests of other users on the platform



Status: ignored, interested, accepted, rejected

