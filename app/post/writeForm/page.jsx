"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { quillModules } from "@/components/QuillModules";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function WriteForm() {
  const { userObj } = useAuth(); // 로그인 한 사용자 정보 가져오기 !
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attachment, setAttachment] = useState();
  const router = useRouter();

  const [formData, setFormData] = useState({
    selectedCategory: "",
    title: "",
    content: "",
    // 일단 file 생략
    // file: null,
  });

  // TODO: 반복되니까 이것도 컴포넌트로 빼면은 좋겠다
  if (!userObj) {
    alert("로그인 해주세요!");
    router.push("/user/loginForm");
    return;
  }

  // 일반 로그인과 구글, 깃허브 로그인의 구분을 위한 PK 확인.. 2개가 다르게 담겨있어서 ㅜㅜ
  const userId = userObj.uid ? userObj.uid : userObj.id;

  // TODO: 이부분 컴포넌트로 빼면 참 좋겠다
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
    } finally {
      setIsLoading(false); // 데이터를 가져온 후 로딩 상태를 종료
    }
  };

  // 페이지 짠 뜨면 카테고리 목록 짠
  useEffect(() => {
    if (!userObj) return;
    getCategoryList();
  }, [userObj]);

  useEffect(() => {
    if (!isLoading && categoryList.length === 0) {
      alert("글을 쓰려면 카테고리를 먼저 등록해야합니다.");
      router.push("/category");
    }
  }, [isLoading, categoryList]); // categoryList 넣어야하남 ..

  // api 요청
  const onsubmit = async (e) => {
    e.preventDefault();

    const { selectedCategory, title, content } = formData;
    console.log(
      "넘어가는 데이터 확인 ",
      selectedCategory,
      title,
      content,
      attachment
    );

    try {
      const response = await axios.post("/api/post/write", {
        userId,
        selectedCategory,
        title,
        content,
        // file, 을 주나? 지금 이건 base64로 서버에 때려넣는데 ㅠ
        // TODO: base64 쌩으로 때려넣기... 이게 옳은가? 돌아는가는데 ㅠ
        attachment,
      });

      if (response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다!");
        // router.push(내가쓴게시글로 ㄱㄱ)
      }
    } catch (error) {
      console.log("write error");
      return "write error !! ";
    }
  };

  //  file
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));

    const reader = new FileReader();
    reader.onloadend = (e) => {
      const result = e.target.result;
      // URL 값 읽어와서 set
      setAttachment(result);
    };
    // blob을 url로 변경해서 읽기
    reader.readAsDataURL(selectedFile);
  };

  console.log("attachment = ", attachment);

  console.log("title = ", formData.title);
  console.log("content = ", formData.content);
  console.log("file = ", formData.file);

  return (
    <>
      <form onSubmit={onsubmit}>
        <select
          className="w-full p-2 mt-3 border rounded-md"
          value={formData.selectedCategory}
          // e.target.value는 카테고리 pk키가 나옴
          onChange={(e) =>
            setFormData({ ...formData, selectedCategory: e.target.value })
          }
        >
          <option value="">카테고리를 선택하세요</option>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
        </select>

        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-2 mt-3 border rounded-md"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <div className="mb-10 mt-3">
          <ReactQuill
            id="content"
            theme="snow"
            value={formData.content}
            // 퀼에디터는 value값으로 넣어줘야함 !
            onChange={(value) => setFormData({ ...formData, content: value })}
            modules={quillModules}
            style={{ height: "500px" }}
          />
        </div>

        <div>
          <input
            id="file"
            type="file"
            accept="image/*" // 이미지만 허용 해주는 속성값
            onChange={onFileChange}
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
        <div>
          <p>
            {attachment && (
              <Image
                src={attachment}
                width={500}
                height={100}
                alt="이미지에요"
              />
            )}
          </p>
        </div>

        <button
          type="submit"
          className="w-1/12 bg-gray-400 hover:bg-teal-600 text-white p-2 rounded mt-4 mb-10"
        >
          등록
        </button>
      </form>
    </>
  );
}
