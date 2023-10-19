import { Nav, Provider } from "@/components";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-[90%] mx-auto">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
