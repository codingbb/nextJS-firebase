"use client";
import styles from "../styles/navigation.module.css";

function Navigation() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>내블로그</li>
          <li>글쓰기</li>
          <li>계정관리</li>
          <li>내구독리스트</li>
          <li>카테고리관리</li>
          <li>로그아웃</li>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
