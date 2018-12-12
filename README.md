# bts-app-backend
This is where the backend of the bts-app lives.


### Server Routes Plan 

Users
- POST /api/signup Create a new user
- POST /api/login User login
- GET /api/users/:id Retrieve user information
- DELETE /api/users/:id Delete a user account
Events
- POST /api/events user Create a new Event
- POST/api/events songkick Create a new Event
- GET /api/events Retrieve all Events
- GET /api/events/:id Retrieve a single  Event
- PATCH /api/events/:id Update a single Event
- DELETE /api/events/:id Delete an Event
- Pickup_locations
- GET /api/users/:id//:type Retrieve location
- POST /api/users/:id/:type Post location
- PATCH /api/users/:id/:type Update location
- PATCH /api/users/ users checked in?
- POST/api/buses add bus capacity to event
Buses
- POST/api/buses/:id. api/create new bus
- PATCH/api/buses/:id (out of service T/F)
- DELETE/api/buses/:id (out of service T/F)
