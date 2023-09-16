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
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="email" required {...email} />
      <input type="password" placeholder="password" {...password} />
      <input placeholder="user name" required {...user_name} />
      <button type="submit">Crear cuenta</button>
    </form>
  );
};

export default SignUp;
