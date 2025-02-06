import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/dashboard")}>
        CampusConnect
      </div>

      {user && (
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
