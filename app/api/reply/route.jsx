import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

// 댓글 저장
export async function POST(request) {
  console.log("Reply POST 실행");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("Data = ", dataJson);

    const { userId, username, postId, comment } = dataJson; // JSON 데이터에서 category 필드 읽기
    console.log(userId, username, postId, comment);

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "reply"), {
      userId: userId,
      username: username,
      postId: postId,
      comment: comment,
      //   serverTimestamp() : 쓰는거 맞겟지요
      createdAt: serverTimestamp(),
    });

    // 댓글 등록하자마자 나오게 하려고 ...
    const addReply = {
      id: docRef.id,
      userId: userId,
      username: username,
      postId: postId,
      comment: comment,
      createdAt: new Date(), // serverTimestamp()는 서버에서만 처리되므로, 클라이언트에서는 대체로 현재 시간으로 설정
    };

    return new Response(JSON.stringify(addReply), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error adding comment",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  console.log("Reply List GET 실행");

  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    console.log("PK키 ", postId);

    if (!postId) {
      return new Response(JSON.stringify({ message: "POST 가 없습니다!" }), {
        status: 400,
      });
    }

    // Firebase Firestore에서 데이터 가져오기
    const q = query(
      collection(db, "reply"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot ", querySnapshot);

    const replies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("replies = ", replies);

    return new Response(JSON.stringify(replies), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error reply List",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
