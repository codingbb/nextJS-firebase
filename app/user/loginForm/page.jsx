function LoginForm() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">JSTORY</h2>
          <p className="text-center text-gray-500 mb-8">
            마음을 담아 만드는 JStory
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                ID
              </label>
              <input
                type="text"
                id="username"
                value="ID"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value="PASSWORD"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
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
