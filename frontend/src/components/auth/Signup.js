import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import ParticleBackground from "../layout/ParticleBackground";
import styles from "./signup.module.css";

const Signup = () => {
  const { signupUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      await signupUser(username, email, password);
      setSuccess("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <ParticleBackground />
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h2 className={styles.signupTitle}>Sign Up</h2>
          {error && <p className={`${styles.signupError} ${styles.show}`}>{error}</p>}
          {success && <p className={`${styles.signupSuccess} ${styles.show}`}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className={styles.signupInput}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.signupInput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.signupInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className={styles.signupInput}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className={styles.signupButton} type="submit">Sign Up</button>
          </form>
          <p className={styles.loginRedirect}>
            Already have an account? <button onClick={() => navigate("/login")}>Login</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;