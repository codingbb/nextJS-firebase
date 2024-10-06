import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function GET(request) {
  console.log("Post detail GET 실행");
  //   console.log("request ", request.url);

  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop(); // URL에서 ID 추출
    // console.log("id ", id);

    // Firebase Firestore에서 데이터 가져오기
    const q = doc(db, "post", id);
    const querySnapshot = await getDoc(q);
    // console.log("querySnapshot ", querySnapshot);

    if (!querySnapshot.exists()) {
      return new Response(JSON.stringify({ message: "Post is not found" }), {
        status: 404,
      });
    }

    // 1개만 가져오니까 map 안쓰지
    const postData = {
      id: querySnapshot.id,
      ...querySnapshot.data(),
    };

    console.log("post = ", postData);

    return new Response(JSON.stringify(postData), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error Post Detail List",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
