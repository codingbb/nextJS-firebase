"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Home() {
  const [postList, setPostList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get("/api/index");

        if (response.status === 200) {
          // console.log("category response data = ", response.data);
          // random 하게 limit 짤라오는게 없어서 이렇게 써야함 ...
          const shuffledPosts = response.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

          setPostList(shuffledPosts);
        }
      } catch (error) {
        console.log("Index 목록 불러오는 중 error");
        return "error !! ";
      }
    };
    getPostList();
  }, []);

  // console.log("postList = ", postList);

  // TODO: 애도 컴포넌트로 빼면 좋겠다
  // 이미지 태그 제거 함수
  const removeImagesFromContent = (content) => {
    // 이미지 태그 제거
    const cleanedContent = content.replace(/<img[^>]*src="[^"]*"[^>]*>/gi, "");
    // 남은 HTML 태그 제거 (예: <p>, <br> 등)
    const textOnly = cleanedContent.replace(/<[^>]+>/g, " ");
    // 남은 공백 및 줄바꿈 정리
    return textOnly.replace(/\s+/g, " ").trim();
  };

  return (
    <div className="flex flex-col mx-4 justify-start gap-y-4">
      <h1 className="text-4xl py-4">JSTORY MAIN</h1>
      <div className="flex flex-wrap">
        {postList.length > 0 ? (
          postList.map((post) => {
            const cleanContent = DOMPurify.sanitize(post.content);
            const textOnly = removeImagesFromContent(cleanContent);

            return (
              // return 추가
              <div className="sm:w-1/2 p-2" key={post.id}>
                <a href={`/post/${post.id}`}>
                  <div className="flex flex-row w-auto h-auto border rounded-xl">
                    <div className="sm:w-64 sm:h-30 w-6 flex justify-center items-center bg-gray-100">
                      <Image
                        src={post.thumbnailFile}
                        alt="Thumbnail"
                        width={400}
                        height={300}
                        className="w-full h-auto" // 이미지 스타일
                      />
                    </div>
                    <div className="ml-7">
                      <div className="text-2xl text-teal-500 w-auto mt-3 mb-8">
                        {post.title}
                      </div>
                      <p className="text-gray-600 mb-4">
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleString()}
                      </p>
                      <div className="w-auto">{textOnly}</div>
                    </div>
                  </div>
                </a>
                {/* 해당 부분 유저별 블로그 만들면 교체하기  */}
                <a href={`/post/${post.userId}`}>
                  <div className="mt-4 p-2 bg-teal-500 text-white rounded-md text-center">
                    사용자 블로그 바로가기
                  </div>
                </a>
              </div>
            );
          })
        ) : (
          <p>게시글이 없습니다.</p> // 게시글이 없을 때 메시지
        )}
      </div>
    </div>
  );
}
