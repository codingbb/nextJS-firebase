import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import bcrypt from "bcryptjs";

export async function POST(request) {
  console.log("POST 요청 받음");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("dataJson = " + JSON.stringify(dataJson));

    const { username, password, email } = dataJson; // username과 password 추출

    // bcrypt
    const saltRounds = 10;
    // 비동기 방식으로 해시
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword = " + hashedPassword);
    // bcrypt end

    // Firebase Firestore에 카테고리 추가
    const docRef = await addDoc(collection(db, "user"), {
      // userId:"auth하고 넣으세요, pk키는 자동으로 생성이 되지요 "
      username: username,
      password: hashedPassword,
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
