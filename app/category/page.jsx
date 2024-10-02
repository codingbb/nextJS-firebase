"use client";

import { useState } from "react";
import axios from "axios";

export default function CategoryForm() {
  // TODO : next Auth ㄱㄱ 지금 ㄴㄴ
  // const [user, setUser] = useState("");
  const [category, setCategory] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/category", {
        category,
      });
    } catch (error) {
      console.log("error");
      return "error !! ";
    }
  };

  console.log("category = " + category);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
    </div>
  );
}
