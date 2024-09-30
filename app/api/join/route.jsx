// 서버
// import { success, fail } from "../../util/ApiUtil";

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
