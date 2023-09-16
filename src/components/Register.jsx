//Dependencies
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Hooks
import useInput from '../hooks/useInput';
//Config
import apiConfig from '../apiConfig';
//Commons
import { EmailError, SignedInMessage } from '../commons/alerts';
import { useEffect } from 'react';
import { setUserList } from '../state/usersList';

const SignUp = () => {
  const { projectBaseUrl } = apiConfig;
  const email = useInput();
  const user_name = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  // useEffect(async () => {
  //   let signedInUsers = await axios.get("/api/users/get-all");
  //   console.log("soy signed in user", signedInUsers.data);
  //   dispatch(setUserList(signedInUsers.data));
  // }, [dispatch]);

  // const emailError = () => {
  //   userList.map((data) => {
  //     if (data.email === email) {
  //       return EmailError();
  //     }
  //   });
  // };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const createdUser = {
        email: email.value,
        password: password.value,
        user_name: user_name.value,
      };

      await axios.post(`${projectBaseUrl}/users/signup`, createdUser, {
        withCredentials: true,
      });
      navigate('/users/login');
      SignedInMessage();
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
            type="email"
            placeholder="Email"
            required
            {...email}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            required
            {...password}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="User Name"
            required
            {...user_name}
          />
        </div>
        <div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
