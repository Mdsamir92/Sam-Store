
import ClientProvider from "@/ClientProvider";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import CartInitializer from "@/app/components/CartInitializer";




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
          {/* <CartInitializer /> */}
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
