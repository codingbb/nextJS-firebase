"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

function AuthGuard({ children }) {
  console.log("여기 안들어오는가요");
  // 처음에는 false이고 나중에 사용자 존재 판명이 모두 끝났을 때 true를 통해 해당 화면을 render
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 유저 정보가 있으면 그 유저 정보를 userObj에 저장
  const [userObj, setUserObj] = useState(null);
  const router = useRouter();

  //   const currentUser = auth.currentUser;
  //   console.log("currentUser = ", currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("user 정보 = ", user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // router.push("/user/loginForm");
      }
      setInit(true); // user 판명 끝
    });

    // 이거 잇어야하나
    return () => unsubscribe();
  }, []);

  if (!init) {
    return <div>회원정보 확인중...</div>;
  }

  return <>{children}</>;

  //   return (
  //     <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}</>
  //   );

  //   return <>{isLoggedIn ? router.push("/") : router.push("/user/loginForm")}</>;
}

export default AuthGuard;
