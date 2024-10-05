"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import React, { useEffect, useState } from "react";

export default function MyPostList() {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const { userObj } = useAuth(); // 로그인 한 사용자 정보 가져오기 !
  // TODO: 반복되니까 이것도 컴포넌트로 빼면은 좋겠다
  if (!userObj) {
    alert("로그인 해주세요!");
    router.push("/user/loginForm");
    return;
  }

  // 일반 로그인과 구글, 깃허브 로그인의 구분을 위한 PK 확인.. 2개가 다르게 담겨있어서 ㅜㅜ
  const userId = userObj.uid ? userObj.uid : userObj;

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get("/api/post/myPostList", {
          params: { userId },
        });

        if (response.status === 200) {
          // console.log("category response data = ", response.data);
          setPostList(response.data);
        }
      } catch (error) {
        console.log("내 블로그 목록 불러오는 중 error");
        return "error !! ";
      }
    };
    getPostList();
  }, [userId]);

  console.log("postList = ", postList);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-10">사용자 이름's Blog</h1>
        <a href="/post/writeForm">
          <h1 className="text-4xl font-bold mb-10 bg-teal-600 rounded-full p-2">
            <Link href="/post/writeForm">✏️</Link>
          </h1>
        </a>
      </div>
      {/* 각 포스트를 반복하여 렌더링 */}
      <div className="flex flex-col mb-8">
        {postList.length > 0 ? (
          postList.map((post) => (
            <div
              key={post.id}
              className="flex flex-row mb-4 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
            >
              <div className="flex justify-center">
                <Image
                  src={post.thumbnailFile}
                  alt="Thumbnail"
                  width={350}
                  height={200}
                />
              </div>
              <a href={`/post/${post.id}`}>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  {/* <p className="text-gray-600 mb-4">{post.createdAt}</p> */}
                  <p className="text-gray-600 mb-4">
                    {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p>게시글이 없습니다.</p> // 게시글이 없을 때 메시지
        )}
      </div>
      {/* 추가 게시글 항목은 여기에 반복해서 추가할 수 있습니다. */}
      {/* <p>Loading...</p> 로딩 중일 때 표시 */}
    </div>
  );
}
