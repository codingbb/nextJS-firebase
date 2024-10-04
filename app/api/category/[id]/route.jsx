import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// 카테고리 저장
export async function DELETE(request) {
  console.log("Category DELETE 실행");
  //   console.log("re ", request.url);       // re  http://localhost:3000/api/category/fVSrmnWxN1Su30ozY4dk

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); // URL에서 ID 추출
    console.log("id ", id); // fVSrmnWxN1Su30ozY4dk

    // Firebase Firestore에 카테고리 삭제
    await deleteDoc(doc(db, "category", id));

    return new Response(JSON.stringify({ message: "Category delete !" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error delete category",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
