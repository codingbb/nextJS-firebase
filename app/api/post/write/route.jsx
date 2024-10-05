import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import path from "path";
import fs from "fs";

// 이미지 들어가면 multipart 라서 해줘야함
export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 bodyParser를 비활성화
  },
};

const uploadDir = path.join(process.cwd(), "public/img"); // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
console.log("uploadDir = " + uploadDir);

export async function POST(request) {
  console.log("WriteForm POST 실행");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("들어온 데이터 = ", dataJson);

    const { userId, selectedCategory, title, content, file } = dataJson; // JSON 데이터에서 필드 읽기
    console.log(userId, selectedCategory, title, content, file);

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "post"), {
      userId: userId,
      categoryId: selectedCategory,
      title: title,
      content: content,
      // thumbnailFile:file,
      createdAt: serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: "Post added", id: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error adding Post",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
