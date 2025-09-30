import { Quicksand } from "next/font/google";
import "./globals.css";
import BackgroundAudio from "@/components/BackgroundAudio";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "A Cute Surprise!",
  description: "A simple yet heartfelt little surprise, made just for you — with a playful twist at the end.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased select-none`}
      >
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}
