import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, password);
      navigate("/dashboard"); 
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className={styles.signupText}>
          Don't have an account?
          <button className={styles.signupButton} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
