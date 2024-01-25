# Book Rating Project

## Introduction

This project aims to create a book rating platform, providing members with the ability to add and rate books.

## Features

- **User Authentication**: Secure user authentication, allowing users to register or log in.
- **Display Books**: Shows books added by users, visible to both logged-in and non-logged-in users.
- **Book Page**: Presents detailed information about a book, accessible to both logged-in and non-logged-in users.
- **Add Books**: Members can contribute new books to the platform.
- **Rate Books**: Members can provide ratings and reviews for books.

## Technologies Used

### Backend (API)

- [Express.js](https://expressjs.com/): Chosen for its speed, minimalism, and flexibility, making it well-suited for building robust APIs.
- [MongoDB](https://www.mongodb.com/): Leveraged the power of a NoSQL database for its scalability and ease of schema-less data storage. Mongoose provides an elegant way to model data.
- [JWT](https://jwt.io/): Utilized for user authentication due to its stateless nature and ability to securely transmit information between parties.

### Frontend

- [Next.js](https://nextjs.org/): Selected for its efficient server-side rendering and ease of building static web applications, enhancing performance and user experience.
- [Redux](https://redux.js.org/): Chose Redux for predictable state management, ensuring a smooth user interface.
- [Mui](https://mui.com/): Adopted for its comprehensive set of UI tools, expediting the development process and maintaining a consistent design.

## Getting Started

To run the application locally, follow these steps:

### Installation

Clone the repository:

```shell
git clone https://github.com/ContentGardeningStudio/full-stack-next-express-app.git
```

### Configuration & Running the Application

#### Backend:

1.  Install dependencies:

    ```shell
    cd full-stack-next-express-app/backend
    npm install
    ```

2.  Configuration:

    - Create a .env file in the backend directory.
    - Add necessary configurations, such as database connection strings and token secret (MONGODB_USER, MONGODB_PASSWORD, TOKEN_SECRET).

3.  Running the backend:
    ```shell
    nodemon server
    ```

#### Frontend:

1.  Install dependencies:

    ```shell
    cd full-stack-next-express-app/frontend
    npm install
    ```

2.  Configuration:

    - Create a .env file in the frontend directory.
    - Add the API host (NEXT_PUBLIC_API_HOST='http://localhost:4000'). The backend is running on 'http://localhost:4000' by default.

3.  Running the frontend:
    ```shell
    npm run dev
    ```
