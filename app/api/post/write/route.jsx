import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // 기능에 지장없는 경고라네요. 타입스크립트 사용하지 않으면 발생한다고 함
// uuidv4() 로 UUID 사용할 수 있음

// 이미지 들어가면 multipart 라서 해줘야함
export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 bodyParser를 비활성화
  },
};

// const uploadDir = path.join(process.cwd(), "public/img"); // 파일 업로드 디렉토리 로컬 또는 서버에 저장할 경로 등
// console.log("uploadDir = " + uploadDir);

export async function POST(request) {
  console.log("WriteForm POST 실행");
  const storage = getStorage();

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("들어온 데이터 = ", dataJson);

    const { userId, selectedCategory, title, content, attachment } = dataJson; // JSON 데이터에서 필드 읽기
    console.log(userId, selectedCategory, title, content, attachment);

    // 이미지 따로 저장
    // const storageRef = ref(storage, `${userId}/${uuidv4()}`);
    // uploadString(storageRef, attachment, "data_url").then(async (snapshot) => {
    //   console.log("Upload data_url String !");
    //   // console.log(await getDownloadURL(storageRef)); // firebase에 저장된 저장소 url
    //   const picUrl = await getDownloadURL(storageRef);
    // });

    const storageRef = ref(storage, `${userId}/${uuidv4()}`);
    await uploadString(storageRef, attachment, "data_url"); // await 추가
    console.log("Upload data_url String !");

    const picUrl = await getDownloadURL(storageRef); // picUrl을 여기서 가져옴

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "post"), {
      userId: userId,
      categoryId: selectedCategory,
      title: title,
      content: content,
      thumbnailFile: picUrl,
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
