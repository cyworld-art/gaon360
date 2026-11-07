import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "GAONVYRA 360 | All-Round Embedded & AI Technology",
  description: "NPU SDK, 8/16/32-bit Firmware, Healthcare Simulation, AI Inference, Embedded Hardware — 가상 기술기업 기술 포트폴리오",
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
