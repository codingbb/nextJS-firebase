"use client";
import styles from "../styles/navigation.module.css";

function Navigation() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
