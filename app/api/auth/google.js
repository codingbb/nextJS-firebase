import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function useSocialLogin(socialName) {
  console.log("socialName 가나요? ", socialName);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export default useSocialLogin;
