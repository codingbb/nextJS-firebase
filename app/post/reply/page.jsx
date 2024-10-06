"use client";

import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/components/AuthContext";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Reply({ userObj, postId, userId }) {
  //   console.log("Reply 확인 = ", userObj, postId, userId);

  const [repliesRes, setRepliesRes] = useState([]);
  const [comment, setComment] = useState();

  // 댓글 조회
  //   useEffect(() => {
  //     const getReply = async () => {
  //       try {
  //         const response = await axios.get("/api/reply", {
  //           params: { postId },
  //         });

  //         if (response.status === 200) {
  //           console.log("response data = ", response.data);
  //           setPost(response.data);
  //         }
  //       } catch (error) {
  //         console.log("내 블로그 목록 불러오는 중 error");
  //         return "error !! ";
  //       }
  //     };
  //     getReply();
  //   }, [postId, userObj, repliesRes]);

  // 댓글 저장
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/reply", {
        userId,
        postId,
        comment,
      });

      if (response.status === 200) {
        alert("댓글이 성공적으로 등록되었습니다!");
        setComment("");
      }
    } catch (error) {
      console.log("error");
      return "error !! ";
    }
  };

  console.log("reply Value = ", comment);

  return (
    <>
      {/* 댓글 뷰 */}
      <div className="flex flex-col p-6 bg-white rounded-lg border">
        <form onSubmit={onsubmit}>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md"
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
