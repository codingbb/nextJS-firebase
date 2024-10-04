import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function POST(request) {
  console.log("여기는 오나요?");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("!1 = ", dataJson);

    const { userId, category } = dataJson; // JSON 데이터에서 category 필드 읽기
    console.log(userId, category);

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "category"), {
      usrId: userId,
      categoryName: category,
      //   serverTimestamp() : 쓰는거 맞겟지요
      createdAt: serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: "Category added", id: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error adding category",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
