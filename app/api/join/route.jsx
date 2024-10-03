import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function POST(request) {
  console.log("POST 요청 받음");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("dataJson = " + JSON.stringify(dataJson));

    const { username, password, email } = dataJson; // username과 password 추출

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "user"), {
      // userId:"auth하고 넣으세요, pk키는 자동으로 생성이 되지요 "
      username: username,
      password: password,
      email: email,
      //   serverTimestamp() : 쓰는거 맞겟지요
      createdAt: serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: "user added", id: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error adding user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

// app/api/join/route.jsx

// export async function POST(req) {
//   const body = await req.json();
//   const { username, password, email } = body;

//   // 여기서 회원가입 로직을 처리합니다 (예: 데이터베이스 저장 등)

//   return new Response(JSON.stringify({ message: "회원가입 성공" }), {
//     status: 200,
//   });
// }
