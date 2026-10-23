import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" end>Events</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/organisers">Organisers</NavLink>
    </nav>
  );
}
