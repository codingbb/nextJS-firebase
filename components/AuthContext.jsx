"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUserObj(JSON.parse(savedUser)); // 저장된 사용자 정보를 불러옴
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserObj(null);
        }
      }
      setInit(true);
      // } else {
      //   setIsLoggedIn(false);
      //   setUserObj(null);
      // }
      // setInit(true);
    });
    return () => unsubscribe();
  }, []);

  const loginUser = (userData) => {
    setIsLoggedIn(true);
    setUserObj(userData); // 일반 로그인 시에도 상태 저장
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUserObj(null);
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보를 제거
    auth
      .signOut() // Firebase 구글, 깃허브 로그아웃
      .then(() => {
        console.log("로그아웃 완료");
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  if (!init) {
    return <div>Loading...</div>;
  }

  // console.log("AuthContext = isLoggedIn = ", isLoggedIn, userObj);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userObj, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
