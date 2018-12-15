# bts-app-backend
This is where the backend of the bts-app lives.

### Server Routes Plan

#### Users
- POST /users				add new user
- PATCH /users/:id			update user
- GET /users/:id			view profile
#### Sign-In
- GET /token				check cookies for token
- POST /token				sign in
- DELETE /token			log out
#### Events
- POST /events 			user/admin create a new Event
- GET /events 				Retrieve all Events
- GET /events/:query 			Retrieve Events by search
- GET /events/:id			Retrieve single Event
- PATCH /events/:id 			Update a single Event
- DELETE /events/:id 		Delete an Event
#### Pickup_locations
- GET /events/:id/pickup 		Get all p/u locations for an Event
- GET /events/:id/pickup/:pid		Get one p/u location for an Event
- POST /pickup			Add new location
- PATCH /pickup/:id			Update location
- PATCH /events/:id/			users checked in? 	
#### Buses
- GET /buses				Get all buses
- GET /buses/:id			Get one bus
- POST /buses				Add a new bus
- PATCH /buses/:id			Update one bus
- DELETE /buses/:id			Retire one bus
