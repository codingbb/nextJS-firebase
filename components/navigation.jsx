"use client";

import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

function Navigation() {
  const path = usePathname(); //현재 경로 가져오기
  const { isLoggedIn, userObj, logoutUser } = useAuth();

  // const onLogoutClick = () => {
  //   signOut(auth)
  //     .then(() => {
  //       alert("로그아웃 되었습니다");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const onLogoutClick = () => {
    logoutUser(); // 일반 로그아웃도 처리
    alert("로그아웃 되었습니다");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/">내블로그</Link>
              </li>
              <li>글쓰기</li>
              <li>계정관리</li>
              <li>내구독리스트</li>
              <li>카테고리관리</li>
              <li>
                <button onClick={onLogoutClick}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              {/* <li className={path == "/user/loginForm" ? styles.active : ""}> */}
              <li>
                <Link href="/user/loginForm">로그인</Link>
              </li>
              {/* </li> */}

              {/* <li className={path == "/user/joinForm" ? styles.active : ""}> */}
              <li>
                <Link href="/user/joinForm">회원가입</Link>
              </li>
              {/* </li> */}
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
