import Link from "next/link";
import { useRouter } from "next/navigation";

const AppRouter = ({ isLoggedIn }) => {
  const router = useRouter();
  return (
    <>
      {isLoggedIn && <Nav />}
      <Routes>
        {isLoggedIn ? (
          <>
            {/* 로그인 정보 있으면 이쪽  */}
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          // 로그인 정보 없으면 이쪽
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
