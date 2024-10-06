import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function DELETE(request) {
  console.log("Reply DELETE 실행");
  //   console.log("re ", request.url);       // re  http://localhost:3000/api/category/fVSrmnWxN1Su30ozY4dk

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); // URL에서 ID 추출
    // console.log("id ", id); // fVSrmnWxN1Su30ozY4dk

    // Firebase Firestore에 카테고리 삭제
    await deleteDoc(doc(db, "reply", id));

    return new Response(JSON.stringify({ message: "Reply delete !" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error delete reply",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  console.log("Reply PUT 실행");
  //   console.log("re ", request.url);       // re  http://localhost:3000/api/category/fVSrmnWxN1Su30ozY4dk

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); // URL에서 ID 추출
    // console.log("id ", id); // fVSrmnWxN1Su30ozY4dk

    const data = await request.json(); // 요청 본문을 JSON으로 파싱
    const { comment } = data;

    // Firebase Firestore 업데이트
    const replyRef = doc(db, "reply", id);
    await updateDoc(replyRef, {
      comment: comment, // comment 필드 업데이트
    });

    return new Response(JSON.stringify({ message: "Reply update !" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error delete reply",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
