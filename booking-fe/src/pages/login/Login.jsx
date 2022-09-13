import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;

    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED" });
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => handleChange(e)}
          className="loginInput"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => handleChange(e)}
          className="loginInput"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="loginButton"
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
