//Dependencies
import React from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//Config
import apiConfig from '../apiConfig';
//Redux States
import { setUser } from '../state/user';

const NavBar = () => {
  const { projectBaseUrl } = apiConfig;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.post(`${projectBaseUrl}/users/logout`, null, {
        withCredentials: true,
      });
      cookies.remove('token');
      dispatch(setUser({}));
      navigate('/');
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
