
## Book Management System

- The Book Management System API facilitates user registration, login, and CRUD operations for books. Users can add, retrieve, update, and delete books. Authentication ensures secure access to protected routes using JWT tokens. The system provides efficient management of book records for users.

### Prerequisites
- Node.js installed on your system (Download Node.js)

- MongoDB installed and running (Download MongoDB)


### Installation Steps

- Clone the repository:

        git clone <repository_url>

- Navigate to the project directory:

        cd <project_directory>

- Install dependencies:

        npm install

- Create a .env file in the root directory:

        PORT=port no 
        mongoUrl=mongoUrl
        key=your_secret_key

- PORT: Port number for the server .
- mongoUrl: MongoDB connection URL.
- key: Secret key for JWT token generation.

`User Routes`

#### Method : POST 

- Endpoint : users/register -> Registers a new user.

- Request Body:

        {
        "name": "User Name",
        "email": "user@example.com",
        "phone": 1234567890,
        "password": "password"
        }
- Response : 201 Created: User registered successfully.

        {
        "message": "User added successfully"
        }
- 400 Bad Request: If email already exists.

        {
        "message": "Email already exists"
        }


#### Method : POST 

- Endpoint : users/login -> Logs in an existing user.

Request Body:

            {
            "email": "user@example.com",
            "password": "password"
            }
- Response:
  200 OK: Login successful.

            {
            "message": "login successfull",
            "token": "jwt_token"
            }
- 401 Unauthorized: If login credentials are incorrect.

            {
            "message": "Unauthorized"
            }
### Book Routes

#### Method : POST 

- Endpoint : books/add -> Adds a new book to the system.

- Headers:

        Authorization: Bearer <jwt_token>

        {
        "title": "Book Title",
        "author": "Book Author",
        "publication_year": "YYYY",
        "userId": "user_id"
        }
- Response:
201 Created: Book created successfully.

            {
            "message": "Book created successfully"
            }
.

##### Method : GET 

- Endpoint : books/allbook -> Retrieves all books in the system.

- Headers:

        Authorization: Bearer <jwt_token>
- Response:
200 OK: Returns an array of book objects.

        [
        {
            "title": "Book Title",
            "author": "Book Author",
            "publication_year": "YYYY",
            "userId": "user_id"
        },
        ...
        ]

#### Method : DELETE 

-Endpoint : books/remove/:id -> Deletes a book from the system.

Headers:

            Authorization: Bearer <jwt_token>
- Params -> id: Book ID

- Response:
201 Created: Book deleted successfully.

            {
            "message": "Book has been deleted"
            }


#### Method : PATCH 

- Endpoint : books/edit/:id -> Updates details of a book in the system.

- Headers:

            Authorization: Bearer <jwt_token>
- Params:
id: Book ID

- Request Body:

            {
            "title": "Updated Title",
            "author": "Updated Author",
            "publication_year": "YYYY"
            }
- Response:
200 OK: Book updated successfully.

        {
        "message": "Book updated successfully"
        }


`Middleware`

- Middleware function to verify JWT token for protected routes.

Headers:

     Authorization: Bearer <jwt_token>
- Response:
200 OK: Token verified, proceeds to the next middleware/route.
401 Unauthorized: If token is invalid or not provided.

            {
            "message": "Please login again"
            }
