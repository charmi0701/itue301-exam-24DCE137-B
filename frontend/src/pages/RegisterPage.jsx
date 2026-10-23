import { useState } from "react";
import { events } from "../data/events";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState(String(events[0].id));
  const [regs, setRegs] = useState([]);
  const [message, setMessage] = useState("");

  const chosenEvent = events.find((event) => event.id === Number(eventId));
  const registrationsForEvent = regs.filter((registration) => registration.eventId === Number(eventId)).length;
  const seatsLeft = chosenEvent ? Math.max(0, chosenEvent.seatsLeft - registrationsForEvent) : 0;

  const register = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setMessage("Name and email are required");
      return;
    }

    const normalizedEmail = trimmedEmail.toLowerCase();
    if (seatsLeft === 0) {
      setMessage("Event is full");
      return;
    }
    if (regs.filter((registration) => registration.email.toLowerCase() === normalizedEmail).length >= 3) {
      setMessage("Limit of 3 registrations reached");
      return;
    }

    setRegs((current) => [...current, {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: trimmedEmail,
      eventId: Number(eventId),
    }]);
    setName("");
    setEmail("");
    setMessage("");
  };

  const feePayable = (registration) => {
    const event = events.find((item) => item.id === registration.eventId);
    const discount = registration.email.toLowerCase().endsWith("@charusat.edu.in") ? 0.8 : 1;
    return (event.fee * discount).toFixed(2);
  };
  const totalPayable = regs.reduce((total, registration) => total + Number(feePayable(registration)), 0);

  return (
    <main>
      <h2>Register for an Event</h2>
      <form onSubmit={register}>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          {events.map((event) => (
            <option key={event.id} value={event.id}>{event.title} ({event.date})</option>
          ))}
        </select>
        <p>Seats left: {seatsLeft}</p>
        <button type="submit">Register</button>
      </form>
      {message && <p role="alert">{message}</p>}

      <h3>My registrations ({regs.length})</h3>
      <ul>
        {regs.map((registration) => {
          const event = events.find((item) => item.id === registration.eventId);
          return (
            <li key={registration.id}>
              {registration.name} — {event.title} — ₹{feePayable(registration)}
              <button type="button" onClick={() => setRegs((current) =>
                current.filter((item) => item.id !== registration.id)
              )}>Cancel</button>
            </li>
          );
        })}
      </ul>
      <p>Total payable: ₹{totalPayable.toFixed(2)}</p>
    </main>
  );
}
