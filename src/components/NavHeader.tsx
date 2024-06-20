import { NavLink } from "react-router-dom"
import "../styles/navHeader.css"

export default function NavHeader() {
    return (
      <nav style={{ display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "#f0f0f0" }}>
        <div>
          <NavLink className={"link"}  to="/">
            Participants
          </NavLink>
        </div>
        <div>
          <NavLink className={"link"}  to="/somethingElse">
            Other
          </NavLink>
        </div>
        <div>
          <NavLink className={"link"}  to="/also">
            Other 2
          </NavLink>
        </div>
      </nav>
    );
}