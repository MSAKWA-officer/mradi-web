import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "./components/footer";
import Navbar from "./components/navibar";


export const metadata: Metadata = {
  title: "Kanisa Letu",
  description: "Mfumo wa Kanisa Letu Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sw">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
