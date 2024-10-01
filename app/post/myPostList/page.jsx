"use client";

export default function MyPostList() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-10">사용자 이름's Blog</h1>
        <a href="/post/writeForm">
          <h1 className="text-4xl font-bold mb-10 bg-teal-600 rounded-full p-2">
            ✏️
          </h1>
        </a>
      </div>
      {/* 각 포스트를 반복하여 렌더링 */}
      <div className="flex flex-row mb-8 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
        <div className="flex justify-center">
          <img
            src="/img/sample-thumbnail.jpg" // 샘플 이미지 경로
            alt="Thumbnail"
            width={350}
            height={200}
          />
        </div>

        <a href={`/post/1`}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">샘플 게시글 제목</h2>
            <p className="text-gray-600 mb-4">2023-10-01</p>
            <p className="text-gray-800 mb-4">
              샘플 게시글 내용이 여기에 나타납니다. 이미지 태그는
              제거되었습니다.
            </p>
          </div>
        </a>
      </div>
      {/* 추가 게시글 항목은 여기에 반복해서 추가할 수 있습니다. */}
      <p>Loading...</p> {/* 로딩 중일 때 표시 */}
    </div>
  );
}
