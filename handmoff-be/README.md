# Handmoff Hotel API

## Schema
- User
```ts
email: string
name: string
password: string
username: string
```

- Room
```ts
name: string
price: string
description: string
features: string[]
images: string[]
booked: boolean
checkIn: Date | null
checkOut: Date | null
```

## Endpoints
- ### auth
  - signup
    - endpoint: `/api/v1/auth/signup`
    - content-type: `application/json`
    - body
    ```json
    {
      "email": "john.doe@example.com",
      "name": "John Doe",
      "password": "johndoe345%",
      "username": "jon-dough"
    }
    ```

  - signin
    - endpoint: `/api/v1/auth/signin`
    - content-type: `application/json`
    - body
    ```json
    {
      "email": "john.doe@example.com",
      "password": "johndoe345%"
    }
    ```

- ### room
  - create room
    - endpoint: `/api/v1/rooms/create`
    - content-type: `multipart/form-data`
    - body
    ```json
    {
      "name": "standard room",
      "description": "a comfortable and affordable room with a queen-size bed and a private bathroom.",
      "price": 25000,
      "features": ["wifi", "tv", "shower"],
      "images": [],
    }
    ```

  - find all rooms
    - endpoint: `/api/v1/rooms`
    - content-type: `application/json`

  - find room by id
    - endpoint: `/api/v1/rooms/:id`
    - content-type: `application/json`

  - book room
    - endpoint: `/api/v1/rooms/book/:id`
    - content-type: `application/json`
    - body
    ```json
    "book": true,
    "checkIn": "2024-04-13T00:00:00",
    "checkOut": "2024-04-17T00:00:00",
    ```
  
  - update room
    - endpoint: `/api/v1/rooms/update/:id`
    - content-type: `multipart/form-data`
    - body
    ```json
    {
      "name": "standard room",
      "description": "a comfortable and affordable room with a queen-size bed and a private bathroom.",
      "price": 25000,
      "features": ["wifi", "tv", "shower"],
      "images": [],
    }
    ```
  
  - remove room
    - endpoint: `/api/v1/rooms/remove/:id`
    - content-type: `application/json`