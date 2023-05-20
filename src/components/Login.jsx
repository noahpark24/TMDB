import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

const Login = () => {
  const password = useInput();
  const user_name = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const createdUser = {
      user_name: user_name.value,
      password: password.value,
      isAutenticated: true,
    };
    axios
      .post("/api/users/login", createdUser)
      .then((result) => {
        dispatch(setUser(result.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
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
