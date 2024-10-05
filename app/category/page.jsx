"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const { userObj } = useAuth(); // 로그인 한 사용자 정보 가져오기 !
  const router = useRouter();

  if (!userObj) {
    alert("로그인 해주세요!");
    router.push("/user/loginForm");
    return;
  }

  // 일반 로그인과 구글, 깃허브 로그인의 구분을 위한 PK 확인.. 2개가 다르게 담겨있어서 ㅜㅜ
  const userId = userObj.uid ? userObj.uid : userObj.id;

  // 카테고리 저장 로직
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/category", {
        userId,
        category,
      });

      if (response.status === 200) {
        alert("카테고리가 성공적으로 등록되었습니다!");
        setCategory(""); // 카테고리 필드 초기화
        getCategoryList();
      }
    } catch (error) {
      console.log("error");
      return "error !! ";
    }
  };
  // 카테고리 저장 로직

  console.log("category = " + category);

  // 내가 작성한 카테고리 리스트 뿌릴거임
  const getCategoryList = async () => {
    try {
      const response = await axios.get("/api/category", {
        params: { userId },
      });

      if (response.status === 200) {
        // console.log("category response data = ", response.data);
        setCategoryList(response.data);
      }
    } catch (error) {
      console.log("카테고리 목록 불러오는 중 error");
      return "error !! ";
    }
  };

  // 페이지 짠 뜨면 카테고리 목록 짠
  useEffect(() => {
    if (!userObj) return;
    getCategoryList();
  }, [userObj]);

  // 카테고리 삭제
  const deleteCategory = async (categoryId) => {
    // alert("확인");
    const confirmDelete = window.confirm("이 카테고리를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/category/${categoryId}`);

      if (response.status === 200) {
        alert("카테고리가 삭제되었습니다!");
        getCategoryList();
      }
    } catch (error) {
      console.log("카테고리 삭제 중 error");
      return "error !! ";
    }
  };

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
        {/* 카테고리 목록 뿌리기 */}
        <div className="flex flex-wrap justify-center">
          {categoryList.length > 0
            ? categoryList.map((category) => (
                <div
                  key={category.id}
                  className="relative w-32 bg-gray-400 text-white p-2 rounded mt-4 mr-3 hover:bg-teal-600"
                >
                  <span>{category.categoryName}</span>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
