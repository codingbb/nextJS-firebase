"use client";

import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/components/AuthContext";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Reply(userObj, postId, userId) {
  console.log("Reply 확인 = ", userObj, postId, userId);

  const [repliesRes, setRepliesRes] = useState([]);

  //   const { userObj } = useAuth();
  //   const [post, setPost] = useState();
  //   const [repliesRes, setRepliesRes] = useState([]);

  //   const { id } = params;
  //   // console.log("이게 됨 ? ", id); // 되네... 주소창에서 잘 가져옴. 그러나! id로 가져와야함. postId로는 못가져오더라
  //   const postId = id;
  //   console.log("이게 됨 ? ", postId);

  //   // isOwner 용 // 이렇게하니까 밑에서 userId로 접근을 못함
  //   // if (userObj) {
  //   //   // 일반 로그인과 구글, 깃허브 로그인의 구분을 위한 PK 확인.. 2개가 다르게 담겨있어서 ㅜㅜ
  //   //   const userId = userObj.uid ? userObj.uid : userObj.id;
  //   //   // console.log("userId = ", userId);   //user pk
  //   //   // console.log("어디 ? ", userObj.displayName);  // kia, ssar
  //   // }

  //   const userId = userObj ? userObj.uid || userObj.id : null;

  //   // 게시글 + 댓글 조회
  //   useEffect(() => {
  //     const getPostAndReply = async () => {
  //       try {
  //         const response = await axios.get(`/api/post/${postId}`);

  //         if (response.status === 200) {
  //           console.log("response data = ", response.data);
  //           setPost(response.data);
  //         }
  //       } catch (error) {
  //         console.log("내 블로그 목록 불러오는 중 error");
  //         return "error !! ";
  //       }
  //     };
  //     getPostAndReply();
  //   }, [postId, userObj]);

  //   // 비동기라.. 로드가 다 되면 출력하게 기다리라고 띄워주기 (이거 loading 페이지 있으면 참 좋겠따)
  //   if (!post) {
  //     return <div>Loading...</div>;
  //   }

  //   // TODO: 애도 컴포넌트로 빼면 좋겠다
  //   // 이미지 태그 제거 함수
  //   const removeImagesFromContent = (content) => {
  //     // 이미지 태그 제거
  //     const cleanedContent = content.replace(/<img[^>]*src="[^"]*"[^>]*>/gi, "");
  //     // 남은 HTML 태그 제거 (예: <p>, <br> 등)
  //     const textOnly = cleanedContent.replace(/<[^>]+>/g, " ");
  //     // 남은 공백 및 줄바꿈 정리
  //     return textOnly.replace(/\s+/g, " ").trim();
  //   };

  //   const cleanContent = DOMPurify.sanitize(post.content);
  //   const textOnly = removeImagesFromContent(cleanContent);

  return (
    <>
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
    </>
  );
}
