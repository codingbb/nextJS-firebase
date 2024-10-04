import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import bcrypt from "bcryptjs";

export async function POST(request) {
  console.log("POST 요청 받음");

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기
    console.log("dataJson = " + JSON.stringify(dataJson));

    const { username, password } = dataJson; // username과 password 추출

    const q = query(collection(db, "user"), where("username", "==", username));
    // console.log("q = " + JSON.stringify(q));
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot = " + JSON.stringify(querySnapshot));

    // 존재하는지 확인
    if (querySnapshot.empty) {
      return new Response(
        JSON.stringify({ message: "존재하지 않는 유저입니다." }),
        { status: 403 }
      );
    }

    // 존재하면 비교
    const userData = querySnapshot.docs[0].data();
    console.log("userData ", userData);
    const hashedPassword = userData.password; // db의 password 가져오기

    // bcrypt.compare()로 해시된 비밀번호 비교
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "ID 혹은 PASSWORD가 일치하지 않습니다" }),
        { status: 403 }
      );
    }

    return new Response(
      JSON.stringify({ message: "로그인 성공", id: querySnapshot.docs[0].id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error login user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
