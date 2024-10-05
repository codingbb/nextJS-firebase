import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function GET(request) {
  console.log("MyBlogPost List GET 실행");

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("PK키 ", userId);

    if (!userId) {
      return new Response(JSON.stringify({ message: "userId가 없습니다!" }), {
        status: 400,
      });
    }

    // Firebase Firestore에서 데이터 가져오기
    const q = query(
      collection(db, "post"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot ", querySnapshot);

    // console.log("들어옴/");

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("posts Server = ", posts);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error Post List",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
