"use client";

import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";
import Link from "next/link";

function Navigation() {
  const path = usePathname(); //현재 경로 가져오기

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

          <li className={path == "/user/loginForm" ? styles.active : ""}>
            <Link href="/user/loginForm">로그인</Link>
          </li>

          <li className={path == "/user/joinForm" ? styles.active : ""}>
            <Link href="/user/joinForm">회원가입</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
