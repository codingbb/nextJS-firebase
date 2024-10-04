"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const [category, setCategory] = useState("");
  const { userObj } = useAuth(); // 로그인 한 사용자 정보 가져오기 !
  const router = useRouter();

  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userObj) {
        alert("로그인 해주세요!");
        router.push("/user/loginForm");
        return;
      }

      // 일반 로그인과 구글, 깃허브 로그인의 구분을 위한 PK 확인.. 2개가 다르게 담겨있어서 ㅜㅜ
      const userId = userObj.uid ? userObj.uid : userObj;

      const response = await axios.post("/api/category", {
        userId,
        category,
      });

      if (response.status === 200) {
        alert("카테고리가 성공적으로 등록되었습니다!");
        setCategory(""); // 카테고리 필드 초기화
      }
    } catch (error) {
      console.log("error");
      return "error !! ";
    }
  };

  console.log("category = " + category);

  // 내가 작성한 카테고리 리스트 뿌릴거임
  // useEffect(() => {});

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            JStory 카테고리 등록
          </h2>

          <form onSubmit={onsubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="카테고리명을 작성해주세요"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-400 text-white p-2 rounded mt-4 hover:bg-teal-600"
            >
              카테고리 등록
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-32 bg-gray-400 text-white p-2 rounded mt-4 mr-3 hover:bg-teal-600">
            액션가면
          </div>
          <div className="w-32 bg-gray-400 text-white p-2 rounded mt-4 mr-3 hover:bg-teal-600">
            액션가면
          </div>
        </div>
      </div>
    </>
  );
}
