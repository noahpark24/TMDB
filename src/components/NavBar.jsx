import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    axios
      .post("/api/users/logout")
      .then((result) => dispatch(setUser(result.data)))
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
