import React from 'react';
import axios from 'axios';
import useInput from '../hooks/useInput';
import apiConfig from '../apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/user';
import { FailedLogin } from '../commons/alerts';

const Login = () => {
  const { projectBaseUrl } = apiConfig;
  const password = useInput();
  const user_name = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const createdUser = {
        user_name: user_name.value,
        password: password.value,
      };
      let logedUser = await axios.post(
        `${projectBaseUrl}/users/login`,
        createdUser,
        {
          withCredentials: true,
        }
      );
      if (logedUser.data.email) {
        dispatch(setUser(logedUser.data));
        navigate('/Movies');
      } else {
        FailedLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input placeholder="user name" {...user_name}></input>
        <input type="password" placeholder="password" {...password}></input>
        <button type="submit">logearse</button>
        <Link to="/users/signup">
          <button>Registrate aqui</button>
        </Link>
      </form>
    </>
  );
};

export default Login;
