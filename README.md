# Titan Project

## Overview

The Titan project is a full-stack application that fetches quotes from the FavQs API and stores them in a MySQL database. The frontend is built with React, and the backend is built with Express.js. The application allows users to request a specified number of quotes, which are then displayed on the frontend.

### API Endpoints

- **GET /quotes**: Fetches a specified number of quotes from the database.

### How It Works

1. **Backend**: The server fetches quotes from the FavQs API and stores them in a MySQL database. It also provides an endpoint to retrieve quotes from the database.
- the qoutes api has bug that return the same qoutes with the same id in diffrent pages.

2. **Frontend**: The React application allows users to request a specified number of quotes, which are then displayed on the page.

### Limitations

- The application fetches quotes in intervals to avoid hitting API rate limits.
- The number of quotes fetched per interval is limited to 30.
- The application does not handle user authentication.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v14.x or higher
- **MySQL**: v5.7 or higher

## Setup

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd titan
    ```

2. **Set up the environment variables**:
    - Create a `.env` file in the `server` directory with the following content:
      ```env
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=
      DB_NAME=mydb
      FAVQS_KEY=your_favqs_api_key
      ```

3. **Run the setup script**:
    ```sh
    npm run setup
    ```

    This script will:
    - Install dependencies for both the client and server.
    - Create the MySQL database and table.

## Running the Application

To start both the client and server, run:
 ```sh
    npm run start
```