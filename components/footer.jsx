import styles from "../styles/footer.module.css";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className="flex flex-row justify-center gap-4">
          <div>About</div>
          <div>Contact</div>
          <div>Privacy Policy</div>
        </div>
        <div>© 2024 Your Company Name. All rights reserved.</div>
      </footer>
    </>
  );
}

export default Footer;
