"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Reply({ userObj, postId, userId }) {
  //   console.log("Reply 확인 = ", userObj, postId, userId);

  const [repliesRes, setRepliesRes] = useState([]);
  const [comment, setComment] = useState();
  const [updateComment, setUpdateComment] = useState();
  const [editMode, setEditMode] = useState(null); // 수정 모드
  const username = userObj.displayName;
  //   console.log("username 111", username);

  // 댓글 조회
  useEffect(() => {
    const getReplyList = async () => {
      try {
        const response = await axios.get("/api/reply", {
          params: { postId },
        });

        if (response.status === 200) {
          console.log("response data 조회 = ", response.data);
          setRepliesRes(response.data);
        }
      } catch (error) {
        console.log("내 블로그 댓글 목록 불러오는 중 error");
        return "error !! ";
      }
    };
    getReplyList();
  }, [postId, userObj]);

  // 댓글 저장
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/reply", {
        userId,
        username,
        postId,
        comment,
      });

      if (response.status === 200) {
        alert("댓글이 성공적으로 등록되었습니다!");
        // console.log("댓글 저장 response 확인 ", response.data);

        const newReply = response.data;

        setRepliesRes([newReply, ...repliesRes]);
        setComment("");
      }
    } catch (error) {
      console.log("error");
      return "error !! ";
    }
  };

  //   console.log("reply Value = ", comment);

  //   댓글 삭제
  const onDelete = async (replyId) => {
    const confirmDelete = window.confirm("이 댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/reply/${replyId}`);

      if (response.status === 200) {
        alert("댓글이 삭제되었습니다!");
        // 삭제된 댓글을 제외한 새로운 리스트로 업데이트
        const updatedReplies = repliesRes.filter(
          (reply) => reply.id !== replyId
        );
        setRepliesRes(updatedReplies);
      }
    } catch (error) {
      console.log("카테고리 삭제 중 error");
      return "error !! ";
    }
  };

  //   수정 모드
  const toggleEditMode = (reply) => {
    setEditMode(reply.id); // 수정할 댓글 ID로 설정 (true, false보단 이게 나은듯)
    setUpdateComment(reply.comment); // 수정모드로 들어가면 댓글 기존 내용을 일단 넣어줌
  };

  // 댓글 수정
  const onUpdate = async (replyId) => {
    try {
      const response = await axios.put(`/api/reply/${replyId}`, {
        comment: updateComment,
      });

      if (response.status === 200) {
        alert("댓글이 수정되었습니다!");

        // 댓글 리스트에서 수정된 댓글 업데이트
        const updatedReplies = repliesRes.map((reply) =>
          // 다른건 다 유지하면서, comment만 update 된걸로 샥 바꿈
          reply.id === replyId ? { ...reply, comment: updateComment } : reply
        );

        setRepliesRes(updatedReplies);
        setEditMode(null); // 수정 모드 해제
      }
    } catch (error) {
      console.log("댓글 수정 중 error");
    }
  };

  return (
    <>
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
          {repliesRes.length > 0 ? (
            repliesRes.map((reply) => (
              <div key={reply.id}>
                <div className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {reply.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{reply.username}</div>

                    {editMode === reply.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updateComment}
                        onChange={(e) => setUpdateComment(e.target.value)}
                      />
                    ) : (
                      <div className="text-gray-700">{reply.comment}</div>
                    )}
                    <div className="text-sm">
                      {new Date(
                        reply.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
                {userObj && userId === reply.userId && (
                  <div className="flex flex-row justify-end">
                    {editMode === reply.id ? (
                      <>
                        <button
                          onClick={() => onUpdate(reply.id)}
                          className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditMode(null)} // 취소 버튼 클릭 시 수정모드 해제
                          className="border p-2 bg-gray-500 rounded-md text-white hover:bg-gray-700"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleEditMode(reply)}
                        className="border p-2 bg-teal-600 rounded-md text-white hover:bg-teal-800"
                      >
                        수정
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(reply.id)}
                      className="border p-2 bg-red-700 rounded-md text-white mr-5 hover:bg-red-800"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500">댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
}
