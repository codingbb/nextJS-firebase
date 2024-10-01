"use client";

function UpdateForm() {
  return (
    <form>
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://via.placeholder.com/80"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="mt-4 text-lg font-semibold">회원 정보 수정</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm">
                기존 비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="oldPassword"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                  ☆
                </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-sm">
                수정 비밀번호
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="checkNewPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="ssar@nate.com"
                readOnly
              />
            </div>
          </div>
          <button
            className="w-full mt-6 py-2 bg-gray-300 text-gray-700 cursor-not-allowed"
            disabled
          >
            회원정보수정
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateForm;
