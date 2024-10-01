"use client";

export default function Detail() {
  return (
    <div className="flex flex-col mx-4 h-screen justify-start gap-y-4">
      <div className="flex flex-row justify-between">
        <h4 className="text-4xl py-4">게시글 제목</h4>
        <p className="mt-auto mr-5">2023-10-01</p>
      </div>
      <hr />
      <div className="mb-40">
        <p>게시글 내용이 여기에 나타납니다. HTML 태그가 포함될 수 있습니다.</p>
      </div>

      <div className="flex flex-row justify-end">
        <button className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800">
          수정
        </button>
        <button className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800">
          삭제
        </button>
      </div>

      {/* 댓글 뷰 */}
      <div className="flex flex-col p-6 bg-white rounded-lg border">
        <form>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md"
            placeholder="댓글을 입력하세요"
          />
          <button className="mt-2 w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-700">
            등록
          </button>
        </form>
        <div className="text-lg font-semibold mt-6 mb-4">댓글 리스트</div>

        <div className="space-y-4">
          {/* 댓글1 */}
          <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                U
              </div>
            </div>
            <div>
              <div className="text-sm font-bold">사용자 이름</div>
              <div className="text-gray-700">
                댓글 내용이 여기에 나타납니다.
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <button className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800">
              수정
            </button>
            <button className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
