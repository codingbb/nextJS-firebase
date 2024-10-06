"use client";

import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/components/AuthContext";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Reply from "../reply/page";

export default function Detail({ params }) {
  const { userObj } = useAuth();
  const [post, setPost] = useState();

  const { id } = params;
  // console.log("이게 됨 ? ", id); // 되네... 주소창에서 잘 가져옴. 그러나! id로 가져와야함. postId로는 못가져오더라
  const postId = id;
  // console.log("이게 됨 ? ", postId);

  const userId = userObj ? userObj.uid || userObj.id : null;

  // 게시글 + 댓글 조회
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/post/${postId}`);

        if (response.status === 200) {
          console.log("response data = ", response.data);
          setPost(response.data);
        }
      } catch (error) {
        console.log("내 블로그 목록 불러오는 중 error");
        return "error !! ";
      }
    };
    getPost();
  }, [postId, userObj]);

  // 비동기라.. 로드가 다 되면 출력하게 기다리라고 띄워주기 (이거 loading 페이지 있으면 참 좋겠따)
  if (!post) {
    return <div>Loading...</div>;
  }

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

  const cleanContent = DOMPurify.sanitize(post.content);
  const textOnly = removeImagesFromContent(cleanContent);

  return (
    <div className="flex flex-col mx-4 h-screen justify-start gap-y-4">
      <div className="flex flex-row justify-between">
        <h4 className="text-4xl py-4">{post.title}</h4>
        <div className="text-xl text-blue-600 w-auto mt-3 mb-8">
          작성자 : {post.username}
        </div>
        <p className="mt-auto mr-5">
          {new Date(post.createdAt.seconds * 1000).toLocaleString()}
        </p>
      </div>
      <hr />
      <div className="mb-40">
        <p>{textOnly}</p>
      </div>

      {userObj && userId == post.userId && (
        <div className="flex flex-row justify-end">
          <button className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800">
            수정
          </button>
          <button className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800">
            삭제
          </button>
        </div>
      )}

      {/* 댓글 뷰 */}
      <Reply userObj={userObj} postId={postId} userId={userId}></Reply>
    </div>
  );
}
