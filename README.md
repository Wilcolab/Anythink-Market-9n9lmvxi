# Node.js Server

This project now uses a Node.js server (Express) that replaces the previous Python/FastAPI implementation. The new server preserves the same public API for task management while updating the runtime and build artifacts.

# Node.js Server (Express) — Migration from Python/FastAPI

This repository has been migrated from a small FastAPI Python app to a lightweight Node.js Express server. The Express server implements the same task-list routes that were previously in `python-server/src/main.py`.

## Project Structure (high level)

- `express-js-server/`: The migrated Node.js/Express server.
  - `express-js-server/src/index.js`: Main Express app containing the routes.
  - `express-js-server/package.json`: Scripts and dependencies (`express`, `nodemon`).
- `python-server/`: The original FastAPI implementation (kept for reference during migration).
- `docker-compose.yml`: Orchestrates services for local development.

## Getting Started

To build and run the services via Docker Compose (recommended):

```bash
docker compose up
```

The migrated Express server listens on port `8001` by default (mapped by the `docker-compose.yml` service). You can also run the Node server directly for development:

```bash
cd express-js-server
npm install
npm start
```

This starts the server with `nodemon` and it will print a message such as `Express server listening on port 8001`.

## API Routes

- `GET /` — Root route. Returns `Hello World`.
- `GET /tasks` — Returns the task list as JSON: `{ "tasks": [ ... ] }`.
- `POST /tasks` — Add a task. Request JSON body should be `{ "text": "your task" }`.
  - Example request:

```json
{ "text": "Write a diary entry from the future" }
```

  - Validation: the server checks that `text` is a non-empty string and returns a `400` error on invalid payloads.

## Migration note

The application routes and in-memory `tasks` array were migrated from `python-server/src/main.py` to `express-js-server/src/index.js`. The behavior is intentionally equivalent: `GET /tasks` returns the current list and `POST /tasks` appends the provided task text.

If you want me to also update the `docker-compose.yml` or remove the old Python service, tell me which behavior you prefer and I'll make the change.
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
