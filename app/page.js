"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col mx-4 justify-start gap-y-4">
      <h1 className="text-4xl py-4">JSTORY MAIN</h1>
      <div className="flex flex-wrap">
        <div className="sm:w-1/2 p-2">
          <a href="/post/1">
            <div className="flex flex-row w-auto h-auto border rounded-xl">
              <div className="sm:w-64 sm:h-30 w-6 flex justify-center items-center bg-gray-100">
                <img
                  src="/img/sample-thumbnail.jpg" // 샘플 이미지 경로
                  alt="Thumbnail"
                  className="w-full h-auto" // 이미지 스타일
                />
              </div>
              <div className="ml-7">
                <div className="text-2xl text-teal-500 w-auto mt-3 mb-8">
                  샘플 게시글 제목
                </div>
                <div className="w-auto">
                  샘플 게시글 내용이 여기에 나타납니다. 이미지 태그는
                  제거되었습니다.
                </div>
              </div>
            </div>
          </a>
          <a href="/blog/1">
            <div className="mt-4 p-2 bg-teal-500 text-white rounded-md text-center">
              사용자 블로그 바로가기
            </div>
          </a>
        </div>
        {/* 추가 게시글 항목은 여기에 반복해서 추가할 수 있습니다. */}
      </div>
    </div>
  );
}
