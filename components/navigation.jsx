"use client";

import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

function Navigation() {
  const path = usePathname(); //현재 경로 가져오기
  const { isLoggedIn, userObj, logoutUser } = useAuth();
  const router = useRouter();

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
    router.push("/");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/">MAIN</Link>
              </li>
              <li>
                <Link href="/post/myPostList">내블로그</Link>
              </li>
              <li>
                <Link href="/post/writeForm">글쓰기</Link>
              </li>
              <li>계정관리</li>
              <li>내구독리스트</li>
              <li>
                <Link href="/category">카테고리관리</Link>
              </li>
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
