// // 서버
// // import { success, fail } from "../../util/ApiUtil";

export async function POST(request) {
  console.log("server join request " + JSON.stringify(request));

  try {
    const dataJson = await request.json(); // request에서 JSON 데이터 읽기

    const { username, password, email } = dataJson; // username과 password 추출

    const sql =
      "insert into user_tb (username, password, email, created_at) values (?, ?, ?, now())";
    const data = await executeQuery(sql, [username, password, email]);

    console.log("dataJson = " + JSON.stringify(dataJson));

    if (data.affectedRows > 0) {
      return success(data);
    } else {
      return fail(null, 500, "회원가입 실패");
    }
  } catch {
    console.error("회원가입 중 오류 발생:");
    // console.error("회원가입 중 오류 발생:", error);
    return fail(null, 500, "서버 오류");
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
