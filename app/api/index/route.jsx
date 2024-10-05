import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function GET() {
  console.log("Index List GET 실행");

  try {
    // Firebase Firestore에서 데이터 가져오기
    // const q = query(collection(db, "post"), limit(2));
    const q = collection(db, "post");
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
