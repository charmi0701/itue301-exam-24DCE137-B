# Campus Event Hub - Starter Kit (ITUE301 Practical Exam, Set B)

Inherited code: each module should meet the rules in the exam paper, but does not. Find out why and fix it.

## Run
Frontend:  cd frontend && npm install && npm run dev      -> http://localhost:5173
Backend:   cd backend  && npm install && npm start        -> http://localhost:5000
Self-check (backend): cd backend && npm test      (passing tests != full marks)
Database:  copy .env.example to .env, set MONGO_URI (Atlas or local), then: npm run seed

## Submission reminders
- Never commit `.env` files or `node_modules`.
- Keep `FINDINGS.md` updated for Tasks 1–5.
- Submit one final commit, as required by the examination instructions.
