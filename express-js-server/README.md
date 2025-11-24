# Express JS Server

This project is a simple Express server scaffolded to listen on port 8001. It uses Nodemon for automatic code reloading during development.

## Project Structure

```
express-js-server
├── src
│   └── index.js          # Entry point of the application
├── package.json          # Configuration file for npm
├── yarn.lock             # Dependency version lock file
├── nodemon.json          # Nodemon configuration file
├── Dockerfile            # Dockerfile for building the application image
├── .dockerignore         # Files to ignore when building the Docker image
├── .gitignore            # Files to ignore by Git
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and Yarn should be installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd express-js-server
   ```

2. Install dependencies:
   ```
   yarn install
   ```

### Running the Server

To start the server with automatic reloading, use:

```
yarn start
```

The server will listen on port 8001.

### Docker

To build and run the application in a Docker container, use the following commands:

1. Build the Docker image:
   ```
   docker build -t express-js-server .
   ```

2. Run the Docker container:
   ```
   docker run -p 8001:8001 express-js-server
   ```

The server will be accessible at `http://localhost:8001`.

## License

This project is licensed under the MIT License.