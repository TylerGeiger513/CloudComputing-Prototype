import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide user name and account menu on login and signup pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/dashboard")}>
        CampusConnect
      </div>
      {!isAuthPage && user && (
        <div className={styles.accountMenu}>
          <button className={styles.accountButton}>
            {user.username} ⌄
          </button>
          <div className={styles.dropdown}>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;