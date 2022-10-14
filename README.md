# perpustakaan-parkee

Rules:
  1. No Authentication
  2. 1 User Only Can Borrow 1 Book At A Time
  3. User can fill the due date with maximum 30 days

Instruction:
  1. Run ```npm i```
  2. Change the ```.env``` file to your liking
  3. Run ```npx sequelize db:create```
  4. Run ```npx sequelize db:migrate```
  5. Run ```npx sequelize db:seed:all```
  6. Run ```npm start``` to start the API

For Future Development:
  1. Create Unit Tests with Test Driven Development
  2. Create Authentication for Admin and User, example JWT
  3. Create 1 more status for booklog ('late')
  4. Use cronjob to track current date and due date, if current date is more than due date and the book is not returned yet. Change the book log status from 'borrowing' to 'late'
  5. Make Users can borrow multiple book at the same time (same start date and due date)

## Endpoints:

- `POST   /v1/admin/book`
- `PATCH  /v1/admin/book/add-stocks`
- `GET    /v1/admin/user/book-log`
- `POST   /v1/user/register`
- `GET    /v1/user/profile`
- `POST   /v1/user/book/:book_id/borrow`
- `PUT    /v1/user/book/:book_id/return`
- `GET    /v1/guest/book`
- `GET    /v1/guest/book/:book_id`


&nbsp;

## 1. POST    /v1/admin/book
Create New Book

Request:
- Body
  ```json
  {
    "title": "string",
    "isbn": "string",
    "stocks": integer
  }
  ```

Response:
- Response (201 - Created)_

  ```json
  {
    "message": "Success Create Book"
  }
  ```
- Response (400 - Bad Request)
  ```json
  {
    "message": "Title is Required"
  }
  OR
  {
    "message": "ISBN Has Been Taken"
  }
  OR
  {
    "message": "ISBN is Required"
  }
  OR
  {
    "message": "Stocks is Required"
  }
  OR
  {
    "message": "Minimum Stocks Is 1"
  }
  ```

&nbsp;
## 2. PATCH   /v1/admin/book/add-stocks
Add Stock To Existing Books

Request:
- Body
  ```json
  {
    "title": "string",
    "isbn": "string",
    "stocks": integer
  }
  ```

Response:
- Response (200 - OK)
  ```json
  {
    "message": "Success Add Stocks"
  }
  ```

- Response (404 - Not Found)
  ```json
  {
    "status": 404,
    "message": "Book Not Found"
  }
  ```
- Response (400 - Bad Request)
  ```json
  {
    "status": 400,
    "message": "Minimum Stocks Is 1"
  }
  ```

&nbsp;
## 3. GET     /v1/admin/user/book-log
Get All Book Log With Data Of User Borrower and Book

Request:
  - Query
    1. limit (default = 5)
    2. page (default  = 0)
    3. status (default = "", can only receive = 'borrowing', 'returned ontime', 'returned late')
    4. isbn (default = "")
    5. title (default = "")

Response:
 - Response (200 - OK)
 ```json
  {
    "count": 2,
    "rows": [
        {
            "id": 2,
            "user_id": 1,
            "book_id": 3,
            "status": "returned ontime",
            "start_date": "2022-10-13",
            "due_date": "2022-10-15",
            "return_date": "2022-10-13",
            "createdAt": "2022-10-13T10:10:17.615Z",
            "updatedAt": "2022-10-13T10:12:57.756Z",
            "User": {
                "id": 1,
                "no_ktp": "082110517592",
                "name": "Bimo",
                "email": "bimonugraraga@gmail.com"
            },
            "Book": {
                "id": 3,
                "title": "Monalisa OverDrive",
                "isbn": "c123"
            }
        },
        ...
      ]
  }
 ```
&nbsp;
## 4. POST    /v1/user/register
Create New User

Request:
 - Body
 ```json
  {
    "email": "string",
    "no_ktp": "string",
    "name": "string"
  }
 ```

Respose
 - Response (201-Creadted)
  ```json
  {
    "message": "Success Create User"
  }
  ```
- Response (400-Bad Request)
```json
{
  "message": "KTP is Required"
}
OR
{
  "message": "KTP Has Been Taken"
}
OR
{
  "message": "Email is Required"
}
OR
{
  "message": "Email Has Been Taken"
}
OR
{
  "message": "Invalid Email Format"
}
```

&nbsp;
## 5. GET     /v1/user/profile
Get Profile User And Their Book Log History

Request:
  - Body
  ```json
  {
  "email": "string"
  }
  ```

Response:
  - Response (200-OK)
  ```json
    {
        "id": 1,
        "no_ktp": "082110517592",
        "name": "Bimo",
        "email": "bimonugraraga@gmail.com",
        "BookLogs": [
            {
                "id": 2,
                "user_id": 1,
                "book_id": 3,
                "status": "returned ontime",
                "start_date": "2022-10-13",
                "due_date": "2022-10-15",
                "return_date": "2022-10-13",
                "Book": {
                    "id": 3,
                    "title": "Monalisa OverDrive",
                    "isbn": "c123"
                }
            },
            {
                "id": 1,
                "user_id": 1,
                "book_id": 1,
                "status": "returned late",
                "start_date": "2022-10-12",
                "due_date": "2022-10-10",
                "return_date": "2022-10-13",
                "Book": {
                    "id": 1,
                    "title": "Neuromancer",
                    "isbn": "a123"
                }
            }
        ]
    }
  ```

  - Response (404-Not Found)
  ```json
  {
    "status": 404,
    "message": "User Not Found"
  }
  ```

&nbsp;
## 6. POST    /v1/user/book/:book_id/borrow
Borrow A Book, Create Book Log With Status Borrowing

Request:
  - Body
  ```json
  {
    "email": "string",
    "no_ktp": "string",
    "due_date": "date(format: yyyy-mm-dd)"
  }
  ```

  - Params
    1. book_id

Response:
  - Response (201 - Created)
  ```json
  {
    "message": "Success Borrow Book"
  }
  ```

  - Response (400 - Bad Request)
  ```json
  {
    "message": "Must Provide Email And KTP"
  }
  OR
  {
    "message": "Status value is Invalid"
  }
  OR
  {
    "message": "Cannot Borrow More Than 1 Book"
  }
  OR
  {
    "message": "Invalid Date"
  }
  OR
  {
    "message": "Maximum Borrwing Time Is 30 Days"
  }
  ```

  - Response (404 - Not Found)
  ```json
  {
    "message": "User Not Found"
  }
  OR
  {
    "message": "Book Not Found Or Book Out Of Stock"
  }
  ```

&nbsp;
## 7. PUT     /v1/user/book/:book_id/return
Return Borrowed Book, Create Book Log With Status 'returned ontime' (before to exact due date) and 'returned late' (after due date)

Request:
  - Body
  ```json
  {
    "email": "string",
    "no_ktp": "string"
  }
  ```

  - Params
    1. book_id

Response:
  - Response (201 - Created)
  ```json
  {
    "message": "Success Return Book"
  }
  ```

  - Response (400 - Bad Request)
  ```json
  {
    "message": "Must Provide Email And KTP"
  }
  OR
  {
    "message": "Not Yet Borrow Any Book Or Wrong Book ID"
  }
  ```

  - Response (404 - Not Found)
  ```json
  {
    "message": "User Not Found"
  }
  OR
  {
    "message": "Book Not Found"
  }
  ```

&nbsp;
## 8. GET     /v1/guest/book
Get All Existing Book With Stocks DESC
Request:
  - Query
    1. limit (default = 5)
    2. page (default  = 0)
    3. title (default = "")

Response:
  - Response (200 - OK)
  ```json
  {
      "count": 4,
      "rows": [
          {
              "id": 4,
              "title": "Laskar Pelangi",
              "isbn": "mygod123",
              "stocks": 22,
              "createdAt": "2022-10-13T10:51:27.821Z",
              "updatedAt": "2022-10-14T18:00:42.345Z"
          },
          {
              "id": 1,
              "title": "Neuromancer",
              "isbn": "a123",
              "stocks": 10,
              "createdAt": "2022-10-12T16:32:53.253Z",
              "updatedAt": "2022-10-13T10:09:36.148Z"
          },
          ...
      ]
  }

  ```

&nbsp;

## 9. GET     /v1/guest/book/:book_id
Get Detail of One Book

Request:
  - Params
    1. book_id


Response:
  - Response (200 - OK)
  ```json
  {
    "id": integer,
    "title": "string",
    "isbn": "string",
    "stocks": integer,
    "createdAt": "date time",
    "updatedAt": "date time"
  }
  ```

  - Response (404 - Not Found)
  ```json
  {
    "message": "Book Not Found"
  }
  ```
## GLOBAL ERROR

```json
{
  "code": 500,
  "message": "internal server error"
}
```
