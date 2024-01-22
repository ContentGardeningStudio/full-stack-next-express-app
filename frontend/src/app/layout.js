import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Old Grimoire",
  description:
    "Welcome to the captivating universe of My Old Grimoire, where every word is an incantation and every page is a mystical adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
