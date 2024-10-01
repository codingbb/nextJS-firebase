// "use client";

function UserInputFields({ getValue, formData, isLoginForm }) {
  console.log("userInput getValue ", getValue);
  console.log("userInput formData ", formData);
  return (
    <>
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

      {!isLoginForm && (
        <>
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
            <div className="flex">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                className="w-full p-2 border border-gray-300 rounded-l mt-1"
                required
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserInputFields;
