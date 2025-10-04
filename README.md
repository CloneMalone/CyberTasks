# 🚀 CyberTasks

A lightweight, modern to-do web app built with Express and Supabase. CyberTasks is designed as a minimal, fast single-page experience to create and manage tasks with a cyber / neon aesthetic. This repository contains the server (Express) and a small static front-end in `public/` that communicates with Supabase for persistence.

---

## 📸 Screenshots
![App Screenshot 1](public/assets/screenshot-1.png)

## Current status

- Core functionality implemented:
  - View tasks (GET /tasks) — tasks are returned newest-first and include a pre-formatted display date.
  - Add tasks (POST /tasks) — the API accepts a JSON body and inserts a new row into the configured Supabase table.
  - Delete tasks (DELETE /tasks/:id) — delete a task by id.
- Static single-page frontend in `public/` that fetches tasks from the server and renders them with vanilla JS.
- Styling with Tailwind CSS and small CSS/animation helpers under `public/css/animation.css`.
- Supabase client is initialized in `db/supabase.js` and table name is configured in `config/config.js`.

Note: user authentication is not implemented yet — all API calls are unauthenticated and operate on a single shared `tasks` table.

## Project structure (important files)

```
package.json
server.js                 # Express server (ESM)
.env                      # Local env vars (not checked in)
config/config.js          # App configuration (table names)
controllers/taskController.js  # Route handlers for /tasks
db/supabase.js            # Supabase client wrapper
models/Task.js            # Task model with date formatting helper
routes/taskRoutes.js      # Express router for tasks
public/                   # Static frontend (HTML, CSS, JS)
  ├─ index.html
  ├─ js/app.js
  ├─ js/api_functions.js
  ├─ js/helper_functions.js
  └─ css/* (Tailwind output + small custom files)
```

## Tech stack

- Frontend: HTML, vanilla JavaScript

- Styling: Tailwind CSS (CLI)

- Backend: Node.js + Express (ESM)

- Database: Supabase (Postgres) via `@supabase/supabase-js`

- Dev tools: dotenv, nodemon

## Quick start

1. Install dependencies

   npm install

2. Create a `.env` file at the project root with these variables:

```
PORT=3867
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-or-anon-key
SUPABASE_TABLE=tasks
```

3. Run the server (dev):

```
npm run dev

```

4. Open http://localhost:3867 in your browser.

Notes:
- The Tailwind CLI scripts are declared in `package.json`:
  - `npm run tailwind` — watch and rebuild `public/css/output.css`
  - `npm run build:css` — build minified output once

## API (server-side routes)

All routes are mounted at the `/tasks` path in `server.js`.

- GET /tasks
  - Returns a JSON payload with the list of tasks (newest first).
  - Example response shape:
    {
      success: true,
      status: 200,
      message: "Tasks retrieved successfully!",
      tasks: [{ id, task_name, created_at, priority, formattedDate }, ...]
    }

- POST /tasks
  - Expects JSON body: { taskName: string, taskPriority: string }
  - Inserts a new row into the configured Supabase table and returns the inserted task.

- DELETE /tasks/:id
  - Deletes a task by id and returns the deleted row.

Server implementation notes:
- The server uses `db/supabase.js` to initialize the Supabase client with `SUPABASE_URL` and `SUPABASE_KEY`.
- Table name is taken from `config/config.js` (TABLES.TASKS).

## Client (public/js)

- `public/js/app.js` is the entry-point for the front-end behavior. It:
  - Fetches tasks from `/tasks` and renders them using helpers in `helper_functions.js`.
  - Handles adding a task (POST /tasks) and immediately inserts the new task into the DOM.
- `public/js/api_functions.js` contains small helpers that call the server endpoints and return parsed responses.

## Future implementations (planned)

This project will be extended to add per-user task lists and authentication. Below is a plan and suggested implementation approach.

High level goals:
- Add user registration and login.
- Associate tasks with users so each user sees only their own tasks.
- Secure API endpoints so only authenticated users can call them.

Future implementation (step-by-step)

1) Supabase authentication vs custom auth
   - Option A (recommended): Use Supabase Auth (built-in). It simplifies token management, handles registration/login, and integrates with the Supabase client on the server and client.
   - Option B: Implement a custom JWT-based auth using an `users` table and issuing JWTs from the Express server. This requires managing password hashing, token rotation, and security considerations. Only choose this if you need custom control.

2) Database changes
   - Add a `users` table (if using Supabase Auth, this is managed by Supabase) and modify the `tasks` table to include a `user_id` foreign key column.
   - Migrate existing tasks if needed (for now, unowned tasks can be left as null or assigned to a default account).

3) Authentication flow (Supabase Auth recommended)
   - Client: Use Supabase client in the front-end to sign up and sign in users. After successful sign-in, Supabase returns an access token (JWT).
   - Server: Protect routes by verifying the Supabase JWT in incoming requests. The Supabase Admin SDK or JWT verification middleware can be used to validate tokens and extract the user ID.
   - Updated endpoint behavior: when creating a task, include the user id (from the authenticated session) so tasks are scoped to the user. When fetching tasks, filter by user id.

4) Server-side changes
   - Add auth middleware that validates the Supabase JWT (or your JWT) and sets req.user = { id, email }.
   - Update `controllers/taskController.js` to use req.user.id when inserting/selecting/deleting tasks.
   - Optionally add user routes (POST /auth/signup, POST /auth/login) only if you implement custom auth on the server.

5) Front-end changes
   - Add a small login/signup UI in `public/` (modal or separate page).
   - After login, store the Supabase auth session token in localStorage/sessionStorage (or rely on the Supabase client which handles session by default).
   - Include the Authorization header (Bearer token) on API requests to server endpoints if the server expects it.

6) Security and edge cases
   - Validate input on both client and server (empty task name, excessively long text).
   - Enforce rate limiting/throttling if this becomes public.
   - Ensure passwords are never logged and that tokens are stored securely on the client.

7) Testing and migration
   - Create migration scripts or SQL to add `user_id` column and relevant indexes.
   - Write integration tests for auth-protected endpoints (happy path + unauthorized access).

---

## 🚀 Future Improvements
- [ ] Edit tasks (UI + API)
- [ ] Per-user task lists (require authentication)
- [ ] User registration and sign in (Supabase Auth or custom auth)
- [ ] Input validation + better error handling on the server
- [ ] Add automated tests and CI workflow

---

## Notes
- The repository currently uses ES Modules. Node 18+ is recommended and `type: "module"` is set in `package.json`.
- The `.env` file is included locally for development in this workspace; do not commit secrets to version control.
