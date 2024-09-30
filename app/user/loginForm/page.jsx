"use client";
import UserInputFields from "@/components/userInputFields";
import { useState } from "react";

function LoginForm() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  // id, password 입력
  //   const getValue = (e) => {
  //     // console.log("e 확인 ", e.target);
  //     // console.log("e 확인 ", e.target.name, e.target.value);
  //     const { name, value } = e.target;
  //     // console.log(name, value);

  //     if (name === "username") {
  //       setUsername(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }

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

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
          <p className="text-center text-gray-500 mb-8">
            마음을 담아 만드는 JStory
          </p>

          <form>
            <UserInputFields
              getValue={getValue}
              formData={formData}
              isLoginForm={true}
            />

            <button
              type="submit"
              className="w-full bg-gray-400 text-white p-2 rounded mt-4"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
