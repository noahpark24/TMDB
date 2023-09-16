//Dependencies
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//Hooks
import useInput from '../hooks/useInput';
//Config
import apiConfig from '../apiConfig';
//Redux States
import { setUser } from '../state/user';
//Commons
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="bg-gray-100 p-6 rounded shadow-lg">
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="User Name"
            {...user_name}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            {...password}
          />
        </div>
        <div className="mb-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Log In
          </button>
        </div>
        <div>
          <Link to="/users/signup">
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              type="button"
            >
              Register Here
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
