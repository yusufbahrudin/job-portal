Endpoints
List of Available Endpoints:

POST  /register

POST  /login

GET  /jobs## Endpoints

List of Available Endpoints:

- `POST  /register`
- `POST  /login`
- `GET  /jobs`
- `POST /jobs`
- `GET /jobs/:id`
- `DELETE /jobs/:id`
- `GET /companies`
- `PUT /jobs/:id`
- `PATCH /jobs/:id`
- `GET /history`

- `POST /public/login`
- `POST /public/register`

- `GET /public/jobs`
- `GET /public/jobs?search=`
- `GET /public/jobs?page=`
- `GET /public/jobs/:id`

- `GET /public/bookmark`
- `POST /public/bookmark:id`
- `DELETE /public/bookmark:id`

### POST /register

#### Description

- add or register account

#### Request

- Body
  ```json
  {
    "username": "Barbar Oyen",
    "email": "barbaroyen@gmail.com",
    "password": "hahahaha",
    "role": "staff",
    "phoneNumber": "123456789",
    "address": "Kp. Sinarwangi No. 002, Ds. Sukajadi, Kec. Tamansari"
  }
  ```

#### Response

_201 - Created_

- Body
  `json
{
  "message": "Account Barbars Oyen with email barbaroyen@agmail.com registered as admin !"
}
`
  _400 - Bad Request_

- Body
  ```json
  {
    "name": "Validation Error",
    "message": [
      "Username is required !",
      "Email is required !",
      "Password is required !",
      "Phone number is required !",
      "Address is required !"
    ]
  }
  ```

### POST /login

#### Description

- login

#### Request

- Body
  ```json
  {
    "email": "barbaroyen@gmail.com",
    "password": "hahahaha"
  }
  ```

#### Response

_200 - OK_

- Body
  `json
{
  "username": "barbaroyen@gmail.com",
  "email": "barbaroyen@gmail.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJiYXJveWVuQGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTY5MTQ5OTQ2OH0.HH7A14atJ5G6lzNocjcsU9Cm4M_H7P7LtgFPmmLHdI4"
}
`
  _401 - Bad Request_

- Body
  ```json
  {
    "name": "Unauthorized",
    "message": "Invalid email or password !"
  }
  ```

### GET /jobs

#### Description

- Get all the jobs and user data (exclude password)

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": 1,
      "title": "IT Engineer",
      "description": "Lorem ipsum dolor sit amet consectetur?",
      "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png",
      "companyId": 1,
      "authorId": 1,
      "jobType": "part time",
      "createdAt": "2023-08-08T03:11:24.219Z",
      "updatedAt": "2023-08-08T03:11:24.219Z",
      "User": {
        "id": 1,
        "username": "yusuf",
        "email": "yusuf.com",
        "role": "admin",
        "phoneNumber": "081295026951",
        "address": "Kp. Sinarwangi No. 001, Ds. Sukajadi, Kec. Tamansari",
        "createdAt": "2023-08-08T03:11:24.042Z",
        "updatedAt": "2023-08-08T03:11:24.042Z"
      }
    }
  ]
  ```

### POST /jobs

#### Description

- Create a new job data

#### Request

- Body
  ```json
  {
    "username": "barbaroyen",
    "email": "barbar@oyen.com",
    "password": "hahahehe",
    "phoneNumber": "121212",
    "address": "jalan maju mundur"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "title": "IT Engineer",
    "description": "Coding coffee coding migrain",
    "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png",
    "jobType": "full time",
    "companyId": 1,
    "authorId": 2
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "name": "SequelizeValidationError",
    "message": [
      "Title is required !",
      "Image URL is required !",
      "Image URL is required !",
      "Job type is required !"
    ]
  }
  ```

### GET /jobs/:id

#### Description

- Get or search detail job by id

#### Response

\_200 - OK

- Body
  `json
{
  "id": 18,
  "title": "IT Engineer",
  "description": "Coding coffee coding migrain",
  "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png",
  "jobType": "full time",
  "companyId": 1,
  "authorId": 2
}
`
  \_404 - Not Found
- Body
  ```json
  {
    "message": "404 Data Not Found"
  }
  ```

### DELETE /jobs/:id

#### Description

- delete job by id

#### Response

\_200 - OK

- Body
  `json
{
  "message": "Job (IT Engineer) success to delete"
}
`
  \_404 - Not Found
- Body
  ```json
  {
    "message": "404 Data Not Found"
  }
  ```

### GET /companies

#### Description

- Get all Company data

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": 1,
      "name": "Whatsapp",
      "companyLogo": "https://w7.pngwing.com/pngs/922/489/png-transparent-whatsapp-icon-logo-whatsapp-logo-whatsapp-logo-text-trademark-grass-thumbnail.png",
      "location": "USA",
      "email": "google@gmail.com",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium voluptate veniam.",
      "createdAt": "2023-08-08T03:11:24.219Z",
      "updatedAt": "2023-08-08T03:11:24.219Z"
    }
  ]
  ```

### PUT http://localhost:3000/jobs/:id

#### Description

- Edit job data

#### Request

- Body
  ```json
  {
    "title": "Sedang coba",
    "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
    "imgUrl": "http://dummyimage.com/139x100.png/dddddd/000000",
    "companyId": 4,
    "authorId": 3,
    "jobType": "Full Time"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Job with id 18 updated"
  }
  ```

### PATCH http://localhost:3000/jobs/:id/:status

#### Description

- Edit job status

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Job (Sedang coba) with id 18 has been updated from Inactive to Inactive"
  }
  ```

### PATCH http://localhost:3000/history

#### Description

- Get all history / logs

#### Response

_200 - OK_

- Body

  ```json
  [
    {
      "id": 19,
      "title": "Sedang coba",
      "description": "Job (Sedang coba) with id 18 has been updated from Inactive to Inactive",
      "updatedBy": "yusuf",
      "createdAt": "2023-08-14T10:40:40.830Z",
      "updatedAt": "2023-08-14T10:40:40.830Z"
    }
  ]
  ```

  ### POST /public/register

#### Description

- add or register account

#### Request

- Body
  ```json
  {
    "email": "barbaroyen@gmail.com",
    "password": "hahahaha"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": 8,
    "role": "customer",
    "email": "hahah@hehe.com",
    "token": "string"
  }
  ```

````
  _400 - Bad Request_

- Body
  ```json
  {
    "name": "Validation Error",
    "message": [
      "Username is required !",
      "Email is required !",
      "Password is required !",
      "Phone number is required !",
      "Address is required !"
    ]
  }
````

### POST /public/login

#### Description

- login

#### Request

- Body
  ```json
  {
    "email": "barbaroyen@gmail.com",
    "password": "hahahaha"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "id": 8,
    "role": "customer",
    "email": "hahah@hehe.com",
    "token": "string"
  }
  `
  _401 - Bad Request_

  ```

- Body
  ```json
  {
    "name": "Unauthorized",
    "message": "Invalid email or password !"
  }
  ```

### GET /public/jobs

#### Description

- get jobs data

#### Response

_200 - OK_

- Body
  ```json
  {
    "currentPage": 1,
    "totalPage": 10,
    "total": 6,
    "data": [
      {
        "id": 1,
        "title": "Compensation Analyst",
        "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
        "imgUrl": "https://cdn2.thecatapi.com/images/987.jpg",
        "companyId": 4,
        "authorId": 3,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    ]
  }
  `
  ```

### GET /public/jobs/:id

#### Description

- get jobs by id

#### Response

_200 - OK_

- Body
  ```json
  {
  "id": 1,
  "title": "Compensation Analyst",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
  "imgUrl": "https://cdn2.thecatapi.com/images/987.jpg",
  "companyId": 4,
  "authorId": 3,
  "jobType": "Full Time",
  "status": "Active",
  "createdAt": "2023-08-23T10:53:25.559Z",
  "updatedAt": "2023-08-23T10:53:25.559Z",
  "QRcode": "qrcode data"
  }
  `
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Job Data Not Found"
  }
  ```

### GET /public/jobs?search=data

#### Description

- get jobs by search

#### Response

_200 - OK_

- Body
  ```json
  {
    "search": "ac",
    "currentPage": 1,
    "totalPage": 3,
    "total": 6,
    "data": [
      {
        "id": 3,
        "title": "Teacher",
        "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
        "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
        "companyId": 2,
        "authorId": 1,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    ]
  }
  ```

### GET /public/jobs?page=2

#### Description

- get jobs with pagination

#### Response

_200 - OK_

- Body

  ```json
  {
    "search": "",
    "currentPage": 2,
    "totalPage": 3,
    "total": 6,
    "data": [
      {
        "id": 3,
        "title": "Teacher",
        "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
        "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
        "companyId": 2,
        "authorId": 1,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    ]
  }
  ```

  ### GET /public/bookmark

#### Description

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": 27,
      "PubUserId": 4,
      "JobId": 3,
      "Job": {
        "id": 3,
        "title": "Teacher",
        "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
        "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
        "companyId": 2,
        "authorId": 1,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    }
  ]
  ```

### POST /public/bookmark/:id

#### Description

- Create a new bookmark data

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": 28,
    "PubUserId": 4,
    "JobId": 2,
    "updatedAt": "2023-08-24T11:49:46.876Z",
    "createdAt": "2023-08-24T11:49:46.876Z"
  }
  ```

### DELETE /public/bookmark/:id

#### Description

- Delete a new bookmark data

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "Bookmark with id (28) deleted"
  }
  ```


POST /jobs

GET /jobs/:id

DELETE /jobs/:id

GET /companies

PUT /jobs/:id

PATCH /jobs/:id

GET /history

POST /public/login

POST /public/register

GET /public/jobs

GET /public/jobs?search=

GET /public/jobs?page=

GET /public/jobs/:id

GET /public/bookmark

POST /public/bookmark:id

DELETE /public/bookmark:id

POST /register
Description
add or register account
Request
Body
{
  "username": "Barbar Oyen",
  "email": "barbaroyen@gmail.com",
  "password": "hahahaha",
  "role": "staff",
  "phoneNumber": "123456789",
  "address": "Kp. Sinarwangi No. 002, Ds. Sukajadi, Kec. Tamansari"
}
Response
201 - Created

Body json { "message": "Account Barbars Oyen with email barbaroyen@agmail.com registered as admin !" }  400 - Bad Request

Body

{
  "name": "Validation Error",
  "message": [
    "Username is required !",
    "Email is required !",
    "Password is required !",
    "Phone number is required !",
    "Address is required !"
  ]
}
POST /login
Description
login
Request
Body
{
  "email": "barbaroyen@gmail.com",
  "password": "hahahaha"
}
Response
200 - OK

Body json { "username": "barbaroyen@gmail.com", "email": "barbaroyen@gmail.com", "role": "admin", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJiYXJveWVuQGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTY5MTQ5OTQ2OH0.HH7A14atJ5G6lzNocjcsU9Cm4M_H7P7LtgFPmmLHdI4" }  401 - Bad Request

Body

{
  "name": "Unauthorized",
  "message": "Invalid email or password !"
}
GET /jobs
Description
Get all the jobs and user data (exclude password)
Response
200 - OK

Body
[
  {
    "id": 1,
    "title": "IT Engineer",
    "description": "Lorem ipsum dolor sit amet consectetur?",
    "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png",
    "companyId": 1,
    "authorId": 1,
    "jobType": "part time",
    "createdAt": "2023-08-08T03:11:24.219Z",
    "updatedAt": "2023-08-08T03:11:24.219Z",
    "User": {
      "id": 1,
      "username": "yusuf",
      "email": "yusuf.com",
      "role": "admin",
      "phoneNumber": "081295026951",
      "address": "Kp. Sinarwangi No. 001, Ds. Sukajadi, Kec. Tamansari",
      "createdAt": "2023-08-08T03:11:24.042Z",
      "updatedAt": "2023-08-08T03:11:24.042Z"
    }
  }
]
POST /jobs
Description
Create a new job data
Request
Body
{
  "username": "barbaroyen",
  "email": "barbar@oyen.com",
  "password": "hahahehe",
  "phoneNumber": "121212",
  "address": "jalan maju mundur"
}
Response
201 - Created

Body
{
  "title": "IT Engineer",
  "description": "Coding coffee coding migrain",
  "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png",
  "jobType": "full time",
  "companyId": 1,
  "authorId": 2
}
400 - Bad Request

Body
{
  "name": "SequelizeValidationError",
  "message": [
    "Title is required !",
    "Image URL is required !",
    "Image URL is required !",
    "Job type is required !"
  ]
}
GET /jobs/:id
Description
Get or search detail job by id
Response
_200 - OK

Body json { "id": 18, "title": "IT Engineer", "description": "Coding coffee coding migrain", "imgUrl": "https://w7.pngwing.com/pngs/728/404/png-transparent-steve-jobs-illustration-steve-jobs-art-jobs-colorful-avatar-celebrities-color-splash-color-pencil-thumbnail.png", "jobType": "full time", "companyId": 1, "authorId": 2 }  _404 - Not Found
Body
{
  "message": "404 Data Not Found"
}
DELETE /jobs/:id
Description
delete job by id
Response
_200 - OK

Body json { "message": "Job (IT Engineer) success to delete" }  _404 - Not Found
Body
{
  "message": "404 Data Not Found"
}
GET /companies
Description
Get all Company data
Response
200 - OK

Body
[
  {
    "id": 1,
    "name": "Whatsapp",
    "companyLogo": "https://w7.pngwing.com/pngs/922/489/png-transparent-whatsapp-icon-logo-whatsapp-logo-whatsapp-logo-text-trademark-grass-thumbnail.png",
    "location": "USA",
    "email": "google@gmail.com",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium voluptate veniam.",
    "createdAt": "2023-08-08T03:11:24.219Z",
    "updatedAt": "2023-08-08T03:11:24.219Z"
  }
]
PUT http://localhost:3000/jobs/:id
Description
Edit job data
Request
Body
{
  "title": "Sedang coba",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
  "imgUrl": "http://dummyimage.com/139x100.png/dddddd/000000",
  "companyId": 4,
  "authorId": 3,
  "jobType": "Full Time"
}
Response
200 - OK

Body
{
  "message": "Job with id 18 updated"
}
PATCH http://localhost:3000/jobs/:id/:status
Description
Edit job status
Response
200 - OK

Body
{
  "message": "Job (Sedang coba) with id 18 has been updated from Inactive to Inactive"
}
PATCH http://localhost:3000/history
Description
Get all history / logs
Response
200 - OK

Body

[
  {
    "id": 19,
    "title": "Sedang coba",
    "description": "Job (Sedang coba) with id 18 has been updated from Inactive to Inactive",
    "updatedBy": "yusuf",
    "createdAt": "2023-08-14T10:40:40.830Z",
    "updatedAt": "2023-08-14T10:40:40.830Z"
  }
]
POST /public/register
Description
add or register account
Request
Body
{
  "email": "barbaroyen@gmail.com",
  "password": "hahahaha"
}
Response
201 - Created

Body
{
  "id": 8,
  "role": "customer",
  "email": "hahah@hehe.com",
  "token": "string"
}
  _400 - Bad Request_

- Body
  ```json
  {
    "name": "Validation Error",
    "message": [
      "Username is required !",
      "Email is required !",
      "Password is required !",
      "Phone number is required !",
      "Address is required !"
    ]
  }
POST /public/login
Description
login
Request
Body
{
  "email": "barbaroyen@gmail.com",
  "password": "hahahaha"
}
Response
200 - OK

Body

{
  "id": 8,
  "role": "customer",
  "email": "hahah@hehe.com",
  "token": "string"
}
`
_401 - Bad Request_
Body

{
  "name": "Unauthorized",
  "message": "Invalid email or password !"
}
GET /public/jobs
Description
get jobs data
Response
200 - OK

Body
{
  "currentPage": 1,
  "totalPage": 10,
  "total": 6,
  "data": [
    {
      "id": 1,
      "title": "Compensation Analyst",
      "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
      "imgUrl": "https://cdn2.thecatapi.com/images/987.jpg",
      "companyId": 4,
      "authorId": 3,
      "jobType": "Full Time",
      "status": "Active",
      "createdAt": "2023-08-23T10:53:25.559Z",
      "updatedAt": "2023-08-23T10:53:25.559Z"
    }
  ]
}
`
GET /public/jobs/:id
Description
get jobs by id
Response
200 - OK

Body
{
"id": 1,
"title": "Compensation Analyst",
"description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
"imgUrl": "https://cdn2.thecatapi.com/images/987.jpg",
"companyId": 4,
"authorId": 3,
"jobType": "Full Time",
"status": "Active",
"createdAt": "2023-08-23T10:53:25.559Z",
"updatedAt": "2023-08-23T10:53:25.559Z",
"QRcode": "qrcode data"
}
`
404 - Not Found

Body
{
  "message": "Job Data Not Found"
}
GET /public/jobs?search=data
Description
get jobs by search
Response
200 - OK

Body
{
  "search": "ac",
  "currentPage": 1,
  "totalPage": 3,
  "total": 6,
  "data": [
    {
      "id": 3,
      "title": "Teacher",
      "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
      "companyId": 2,
      "authorId": 1,
      "jobType": "Full Time",
      "status": "Active",
      "createdAt": "2023-08-23T10:53:25.559Z",
      "updatedAt": "2023-08-23T10:53:25.559Z"
    }
  ]
}
GET /public/jobs?page=2
Description
get jobs with pagination
Response
200 - OK

Body

{
  "search": "",
  "currentPage": 2,
  "totalPage": 3,
  "total": 6,
  "data": [
    {
      "id": 3,
      "title": "Teacher",
      "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
      "companyId": 2,
      "authorId": 1,
      "jobType": "Full Time",
      "status": "Active",
      "createdAt": "2023-08-23T10:53:25.559Z",
      "updatedAt": "2023-08-23T10:53:25.559Z"
    }
  ]
}
GET /public/bookmark
Description
Response
200 - OK

Body
[
  {
    "id": 27,
    "PubUserId": 4,
    "JobId": 3,
    "Job": {
      "id": 3,
      "title": "Teacher",
      "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      "imgUrl": "https://cdn2.thecatapi.com/images/MTk0NDg2MA.jpg",
      "companyId": 2,
      "authorId": 1,
      "jobType": "Full Time",
      "status": "Active",
      "createdAt": "2023-08-23T10:53:25.559Z",
      "updatedAt": "2023-08-23T10:53:25.559Z"
    }
  }
]
POST /public/bookmark/:id
Description
Create a new bookmark data
Response
201 - Created

Body
{
  "id": 28,
  "PubUserId": 4,
  "JobId": 2,
  "updatedAt": "2023-08-24T11:49:46.876Z",
  "createdAt": "2023-08-24T11:49:46.876Z"
}
DELETE /public/bookmark/:id
Description
Delete a new bookmark data
Response
200 - OK

Body
{
  "message": "Bookmark with id (28) deleted"
}
