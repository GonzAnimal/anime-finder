import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Anime finder",
  description: "Nextjs, Apollo GraphQL exercise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <section className="relative w-full min-h-screen scroll-smooth">
            <Navbar />
            {children}
          </section>
        </ApolloWrapper>
      </body>
    </html>
  );
}
