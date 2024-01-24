import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/redux/ReduxProvider";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Old Grimoire",
  description:
    "Welcome to the captivating universe of My Old Grimoire, where every word is an incantation and every page is a mystical adventure.",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer position="top-right" />
        </body>
      </html>
    </ReduxProvider>
  );
}
