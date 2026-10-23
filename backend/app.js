const express = require("express");
const app = express();

// Request logger: [METHOD] [PATH] [TIMESTAMP]
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
});
app.use(express.json());

let events = [
  { id: 1, title: "Hack Night", capacity: 30, fee: 100 },
  { id: 2, title: "Open Mic", capacity: 50, fee: 0 },
  { id: 3, title: "Robotics Expo", capacity: 80, fee: 250 },
];
let nextId = 4;

app.get("/api/v1/events", (req, res) => {
  if (req.query.maxFee === undefined) return res.status(200).json(events);
  const maxFee = Number(req.query.maxFee);
  if (!Number.isFinite(maxFee)) return res.status(400).json({ error: "maxFee must be a number" });
  res.status(200).json(events.filter((event) => event.fee <= maxFee));
});

app.get("/api/v1/events/:id", (req, res) => {
  const event = events.find((item) => item.id === Number(req.params.id));
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.status(200).json(event);
});

app.post("/api/v1/events", (req, res) => {
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const { capacity } = body;
  const fee = body.fee === undefined ? 0 : body.fee;

  if (title.length < 1 || title.length > 80) {
    return res.status(400).json({ error: "title must be 1 to 80 characters" });
  }
  if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity < 1 || capacity > 500) {
    return res.status(400).json({ error: "capacity must be a whole number from 1 to 500" });
  }
  if (typeof fee !== "number" || !Number.isFinite(fee) || fee < 0) {
    return res.status(400).json({ error: "fee must be a number greater than or equal to 0" });
  }

  const event = { id: nextId++, title, capacity, fee };
  events.push(event);
  res.status(201).json(event);
});

app.delete("/api/v1/events/:id", (req, res) => {
  const index = events.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Event not found" });
  const [event] = events.splice(index, 1);
  res.status(200).json(event);
});

// Diagnostic route used to test the error handler. Leave it in place.
app.get("/api/v1/boom", () => {
  throw new Error("Stage collapsed");
});

// Keep this after routes so synchronous route errors reach the handler.
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;
