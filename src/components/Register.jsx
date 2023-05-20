import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const email = useInput();
  const user_name = useInput();
  const password = useInput();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const createdUser = {
      email: email.value,
      password: password.value,
      user_name: user_name.value,
    };
    axios
      .post("/api/users/signup", createdUser)
      .then(navigate("/"))
      .catch((err) => console.log("YOU BROKE THIS =>", err));
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
