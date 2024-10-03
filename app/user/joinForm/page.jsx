"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function JoinForm() {
  const router = useRouter();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");

  // const bcrypt = require("bcrypt");
  // const saltRounds = 10;
  // const myPlaintextPassword = "s0//P4$$w0rD";
  // const someOtherPlaintextPassword = "not_bacon";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

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
    const { username, password, email } = formData;
    console.log("확인 ", username, password, email);

    try {
      const response = await axios.post("/api/join", {
        username,
        password,
        email,
      });
      console.log("Front response = ", response);

      if (response.status === 200) {
        alert("회원가입 성공");
        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        alert("에러");
      }
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
