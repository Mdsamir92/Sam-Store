
import ClientProvider from "@/ClientProvider";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientProvider>
          <Navbar />
          <ScrollToTop />
       
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
