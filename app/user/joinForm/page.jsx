"use client";

import UserInputFields from "@/components/userInputFields";
import { useState } from "react";

function JoinForm() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [checkPassword, setCheckPassword] = useState(true);
  //   const [checkEmail, setCheckEmail] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    checkPassword: "",
    checkEmail: "",
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
              isLoginForm={false}
            />

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
