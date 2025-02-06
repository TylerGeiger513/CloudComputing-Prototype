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
      const data = await signup(username, email, password);
      setSuccess("Signup successful! Redirecting...");
  
      await loginUser(email, password); 
  
      navigate("/dashboard"); 
    } catch (err) {
      setError(err);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className={styles.loginText}>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
