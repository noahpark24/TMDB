import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogContext } from "../contexts/LogContext";
import axios from "axios";

const NavBar = () => {
  const user = useContext(LogContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .post("/api/users/logout")
      .then((result) => result.data)
      .then((result) => {
        user.logoutUser(result);
      })
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <nav>
      {user.email ? (
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      ) : (
        <Link to="/users/login">
          <button>Login</button>
        </Link>
      )}
      {user.email ? <button onClick={handleLogOut}>Logout</button> : ""}

      <Link to="/Movies">
        <button>Movies</button>
      </Link>
      <Link to="/TV">
        <button>TV shows</button>
      </Link>
    </nav>
  );
};

export default NavBar;
