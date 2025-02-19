import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import ParticleBackground from "../layout/ParticleBackground";
import styles from "../../styles/Login.module.css"

const Login = () => {
  const { loginUser } = useAuth();
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
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <ParticleBackground />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>Login</h2>
          {error && <p className={`${styles.loginError} ${styles.show}`}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={styles.loginButton} type="submit">Login</button>
          </form>
          <p className={styles.signupRedirect}>
            Don't have an account?
            <button className={styles.signupRedirectButton} onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
