import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

const Login = () => {
  const navigate = useNavigate();
  const password = useInput();
  const user_name = useInput();

  const user = useContext(LogContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const createdUser = {
      user_name: user_name.value,
      password: password.value,
    };
    axios
      .post("http://localhost:3000/api/users/login", createdUser)
      .then((result) => result.data)
      .then((result) => {
        user.loginUser(result);
      })
      .then(navigate("/"))
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
