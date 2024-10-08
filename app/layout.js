import "./globals.css";
import Navigation from "../components/navigation";
import Footer from "@/components/footer";
import "react-quill/dist/quill.snow.css";
// import AuthGuard from "@/components/AuthGuard";
// import firebase from "@/firebase/firebase";
// console.log(firebase);
import { AuthProvider } from "@/components/AuthContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AuthGuard> */}
        <AuthProvider>
          <Navigation />
          <div>{children}</div>
          <Footer />
          {/* </AuthGuard> */}
        </AuthProvider>
      </body>
    </html>
  );
}
