// 성공시
export function success(data, status = 200) {
  console.log("apiUtill user = " + JSON.stringify(user));
  return new Response(
    // 프런트에 줄거
    JSON.stringify({
      status: status,
      msg: "성공",
      //   body: data,
      body: data,
      user: user,
    }),
    // 프로토콜 신고(?)
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

//실패시
export function fail(data, status, msg) {
  console.log("apiUtill fail data = " + JSON.stringify(data));
  return new Response(
    // 프런트에 줄거
    JSON.stringify({
      status: status,
      msg: msg,
      body: data,
    }),
    // 프로토콜 신고(?)

    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
