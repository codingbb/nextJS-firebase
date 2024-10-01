"use client";

import UserInputFields from "@/components/userInputFields";
import useGetFieldsValue from "@/components/useGetFieldsValue";
import axios from "axios";
import { useRouter } from "next/navigation";

function JoinForm() {
  const router = useRouter();
  const [value, getValue] = useGetFieldsValue({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    checkPassword: "",
    checkEmail: "",
  });

  //   console.log("Value ", value);

  const join = async (e) => {
    e.preventDefault();

    const { username, password, email } = value;
    console.log(username, password, email);

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
            <UserInputFields
              getValue={getValue}
              formData={value}
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
