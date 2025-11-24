# Node.js Server

This project now uses a Node.js server (Express) that replaces the previous Python/FastAPI implementation. The new server preserves the same public API for task management while updating the runtime and build artifacts.

## Project Structure

- `node-server/src/index.js`: Main Express server that exposes the task routes.
- `node-server/src/routes/tasks.js`: Route handlers for creating and retrieving tasks.
- `node-server/package.json`: Node.js dependencies and start scripts.
- `node-server/.env` (optional): Environment variables (e.g., PORT).
- `node-server/Dockerfile`: Docker image definition for the Node.js server.
- `docker-compose.yml`: Updated compose file to run the Node.js service (and any other services).
- (previous python-server/*) - retained for history but no longer the active server.

## Getting Started

To run the Node.js server with Docker:

- Build and start the services:

  ```shell
  docker compose up
  ```

  The Node.js server listens on port `8000` (configurable via `PORT` env).

To run locally without Docker:

- From the workspace root:

  ```shell
  cd node-server
  npm install
  npm start
  ```

  The server will start on the port configured in `.env` or `PORT` (default: 8000).

## API Routes

The server provides the same API surface as before:

- `POST /tasks`  
  Adds a task to the task list. Request body (JSON):

  ```json
  { "task": "Buy milk" }
  ```

  Returns the created task (with id/timestamp when applicable).

- `GET /tasks`  
  Retrieves the current task list as JSON array.

Notes: The implementation uses in-memory storage by default. Tasks are not persisted across container restarts unless you add persistent storage or a database.

## Migration Details

- Runtime changed from Python/FastAPI to Node.js/Express.
- Public endpoints (`POST /tasks`, `GET /tasks`) remain compatible to minimize client changes.
- Differences to be aware of:
  - Validation: Request body validation differs from FastAPI. Ensure clients send JSON with a `task` field.
  - Persistence: Current Node.js implementation uses in-memory storage. To preserve production data, migrate tasks from the old server before decommissioning:
    - Export tasks from the old server:
      ```shell
      curl -s http://old-server:8000/tasks > tasks.json
      ```
    - Import into the new server:
      ```shell
      jq -c '.[]' tasks.json | while read t; do curl -X POST -H "Content-Type: application/json" -d "$t" http://new-server:8000/tasks; done
      ```
  - Environment: Use `PORT` and standard Node environment variables in `node-server/.env` or `docker-compose.yml`.
- CI / Devcontainer: Node.js, npm and eslint are available in the devcontainer. Use `npm test` / `npm run lint` as configured in `package.json`.

If you need, I can produce example route code, Dockerfile, or an updated docker-compose snippet for the Node.js server.
