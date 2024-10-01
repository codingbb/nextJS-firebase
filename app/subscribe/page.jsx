"use client";

export default function SubList() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">사용자님이 구독 중인 블로그</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white">
            <div>
              <h3 className="text-xl font-bold mb-2">블로그 이름</h3>
              <p className="text-red-500 text-sm mb-1">[최신글] 게시글 제목</p>
              <p className="text-red-500 text-sm mb-1">[최신글] 게시글 제목</p>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded">
              구독취소
            </button>
          </div>
          {/* 추가 블로그 항목은 여기에 반복해서 추가할 수 있습니다. */}
        </div>
      </div>
    </div>
  );
}
