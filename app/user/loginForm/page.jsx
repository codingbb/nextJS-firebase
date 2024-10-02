"use client";

import UserInputFields from "@/components/userInputFields";
import useGetFieldsValue from "@/components/useGetFieldsValue";
import { useState } from "react";
import useSocialLogin from "@/app/api/auth/google";
import { auth } from "@/firebase/firebase";
import {
  // getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [value, getValue] = useGetFieldsValue({
  //   username: "",
  //   password: "",
  // });

  // console.log("Vale ", value);
  // console.log("getVale ", getValue);

  // 인증과 관련된 것들 초기화
  // const auth = getAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 일단 빼지말고 해봅시다
  const onSocialClick = (e) => {
    const socialName = e.target.name;
    alert(e.target.name);
    // useSocialLogin(socialName);
    if (socialName === "google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(token, user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
        });
    } else if (socialName === "github") {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(token, user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GithubAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
        });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
          <p className="text-center text-gray-500 mb-8">
            마음을 담아 만드는 JStory
          </p>

          <form>
            {/* <UserInputFields
              getValue={getValue}
              formData={value}
              isLoginForm={true}
            /> */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                유저네임
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={getValue}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={getValue}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-400 text-white p-2 rounded mt-4"
            >
              로그인
            </button>
          </form>
          <button
            type="button"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
            name="google"
            onClick={onSocialClick}
          >
            구글 로그인
          </button>
          <button
            type="button"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
            name="github"
            onClick={onSocialClick}
          >
            깃허브 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
