# FINDINGS

# Findings

## T1 — Event Listing
- **What was wrong:** EventCard assigned `0` to `seatsLeft`, the page passed the wrong seats prop, and dates/durations were not formatted.
- **Why it mattered:** Cards could never show the actual remaining seats and did not meet the required display formats; duplicate titles could also produce React key warnings.
- **How I fixed it:** `EventCard.jsx` now compares seats without mutating them, formats fee/date/duration, and `EventsPage.jsx` passes `seatsLeft` with a unique event ID key. Formatting is in `utils/format.js`.

## T2 — Registration
- **What was wrong:** The Register link pointed to a route that did not exist, registration mutated React state directly, and the page did not validate or calculate fees/seats.
- **Why it mattered:** Navigation failed and registrations could fail to render or bypass capacity, per-email limits and the required totals.
- **How I fixed it:** `NavBar.jsx` links to `/register`; `RegisterPage.jsx` validates fields, checks remaining seats and the three-registration email limit, applies the university discount, and supports cancellation and payable totals.

## T3 — Organisers Directory
- **What was wrong:** The API request ran on every render, the JSON response was not returned, and the page did not display sorting, count, or a retry path.
- **Why it mattered:** Requests could repeat, organisers were never populated, and failures could not be recovered from as required.
- **How I fixed it:** `OrganisersPage.jsx` loads in an effect, checks HTTP status, catches request/JSON errors, sorts names case-insensitively, shows the count, and lets the user retry.

## T4 — Events Service
- **What was wrong:** POST rejected valid titles, did not validate event fields, filtering and DELETE were missing, ID lookup compared numbers to strings, and the error handler was registered before the routes.
- **Why it mattered:** Valid requests failed, invalid input could be stored, required endpoints were incomplete, and route errors could miss the JSON error handler.
- **How I fixed it:** `backend/app.js` validates and trims POST data, filters by `maxFee`, implements numeric-ID lookup and DELETE, retains per-request logging, and places the stack-hiding error handler after the routes.

## T5 — Event Data
- **What was wrong:** The schema misspelled `required`, stored dates as strings, used a fixed creation timestamp, and the formatter and seed script were unfinished.
- **Why it mattered:** Invalid events could pass validation, date data was not a real date, timestamps were shared, and there was no clean validation report or database example.
- **How I fixed it:** `backend/models/Event.js` now has the required date/title/capacity/category/fee rules and per-document timestamp; `backend/utils/formatError.js` returns plain field/message details; `backend/seed.js` saves a valid event and prints the formatted invalid-event errors.
