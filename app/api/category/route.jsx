import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

console.log("들어는 가지요?? 네 들어는와요");

export async function POST(request) {
  console.log("여기는 오나요?");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "category"), {
      // userId:"auth하고 넣으세요, pk키는 자동으로 생성이 되지요 "
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
