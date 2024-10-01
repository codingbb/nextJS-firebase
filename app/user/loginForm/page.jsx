"use client";

import UserInputFields from "@/components/userInputFields";
import useGetFieldsValue from "@/components/useGetFieldsValue";

function LoginForm() {
  const [value, getValue] = useGetFieldsValue({
    username: "",
    password: "",
  });

  console.log("Vale ", value);

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
              formData={value}
              isLoginForm={true}
            />

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
          >
            구글 로그인
          </button>
          <button
            type="button"
            className="w-full bg-gray-400 text-white p-2 rounded mt-4"
          >
            깃허브 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
