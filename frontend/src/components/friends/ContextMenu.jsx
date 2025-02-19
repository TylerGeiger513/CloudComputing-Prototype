import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/FriendsCard.module.css";

const ContextMenu = ({ contextMenu, handleRemoveFriend }) => {
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ top: contextMenu.y, left: contextMenu.x });

  useEffect(() => {
    const menuWidth = menuRef.current?.offsetWidth || 0;
    let left = contextMenu.x;
    if (contextMenu.x + menuWidth > window.innerWidth) {
      left = contextMenu.x - menuWidth;
      if (left < 0) left = 0;
    }
    setPosition({ top: contextMenu.y, left });
  }, [contextMenu]);

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{ top: position.top, left: position.left, position: "fixed" }}
    >
      <ul>
        <li onClick={() => handleRemoveFriend(contextMenu.friend._id)}>
          Remove Friend
        </li>
        <li onClick={() => {}}>Block (inactive)</li>
        <li onClick={() => {}}>View Profile (inactive)</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
