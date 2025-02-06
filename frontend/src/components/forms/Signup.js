import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { signup } from "../../services/authService";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { loginUser } = useContext(AuthContext);
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
      setError("Passwords do not match.");
      return;
    }
  
    try {
      await signup(username, email, password);
      setSuccess("SIGN UP SUCCESS! REDIRECTING...");
  
      await loginUser(email, password); 
  
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
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
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
