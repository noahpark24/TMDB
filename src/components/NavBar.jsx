import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      let logoutUser = await axios.post("/api/users/logout");
      dispatch(setUser(logoutUser.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      {user.email ? (
        <>
          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <Link to="/users/login">
          <button>Login</button>
        </Link>
      )}

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
