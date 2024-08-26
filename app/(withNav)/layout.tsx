import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </main>
  );
}
