"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { debounce } from "lodash";

function JoinForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [checkPassword, setCheckPassword] = useState(null);

  const getValue = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const join = async (e) => {
    e.preventDefault();

    // console.log("확인 ", formData.username, formData.password, formData.email);
    const { username, password, confirmPassword, email } = formData;
    console.log("확인 ", username, password, email);

    try {
      const response = await axios.post("/api/join", {
        username,
        password,
        confirmPassword,
        email,
      });
      console.log("Front response = ", response);

      if (response.status === 200) {
        alert("회원가입 성공");
        router.push("/");
      }
    } catch (error) {
      // console.log("error = ", error);
      if (error.response) {
        // console.log("error.response = ", error.response);
        alert(error.response.data.message);
      }
    }
  };

  const checkPasswords = useCallback(
    debounce(() => {
      if (formData.password !== formData.confirmPassword) {
        setCheckPassword(false);
      } else {
        setCheckPassword(true);
      }
    }, 500),
    [formData.password, formData.confirmPassword]
  );

  useEffect(() => {
    checkPasswords();
  }, [formData.password, formData.confirmPassword, checkPasswords]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
          <p className="text-center text-gray-500 mb-8">
            마음을 담아 만드는 JStory
          </p>

          <form onSubmit={join}>
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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={getValue}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
              {!checkPassword && (
                <span className="text-red-500 mb-2">
                  비밀번호가 일치하지 않습니다
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <button
              className="bg-green-500 text-white px-4 rounded-r mt-1"
              type="button"
            >
              인증
            </button>

            <button
              type="submit"
              className="w-full bg-gray-400 text-white p-2 rounded mt-4"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default JoinForm;
