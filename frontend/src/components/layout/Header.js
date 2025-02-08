// frontend/src/components/layout/Header.js
import React, { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
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
      <div>
        <button onClick={toggleTheme} style={{ marginRight: "10px" }}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
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
      </div>
    </header>
  );
};

export default Header;
