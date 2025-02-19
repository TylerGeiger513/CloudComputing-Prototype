import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = async () => {
    await logoutUser();
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
