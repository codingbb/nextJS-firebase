"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { quillModules } from "@/components/QuillModules";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function UpdateForm() {
  return (
    <form>
      <select className="w-full p-2 mt-3 border rounded-md">
        <option value="">카테고리를 선택하세요</option>
        <option value="1">카테고리 1</option>
        <option value="2">카테고리 2</option>
        <option value="3">카테고리 3</option>
      </select>

      <input
        id="title"
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full p-2 mt-3 border rounded-md"
      />

      <div className="mb-10 mt-3">
        <ReactQuill
          id="content"
          theme="snow"
          value="value"
          // onChange={setValue}
          modules={quillModules}
          style={{ height: "500px" }}
        />
      </div>

      <div>
        <input
          id="file"
          type="file"
          className="w-full p-2 mt-3 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-1/12 bg-gray-400 hover:bg-teal-600 text-white p-2 rounded mt-4 mb-10"
      >
        등록
      </button>
    </form>
  );
}
