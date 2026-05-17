import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animesh Pandey — Building Enterprise AI That Scales",
  description:
    "Senior GenAI Engineer with 5+ years experience in Conversational AI, GCP, Vertex AI, Dialogflow CX, Voice AI, Agentic AI, and enterprise production deployments across fintech, telecom, healthcare, and public sector.",
  keywords: [
    "Animesh Pandey",
    "GenAI Engineer",
    "Conversational AI",
    "Vertex AI",
    "Dialogflow CX",
    "GCP",
    "Voice AI",
    "Agentic AI",
    "Enterprise AI",
    "RAG",
    "LangGraph",
    "Prompt Engineering",
  ],
  authors: [{ name: "Animesh Pandey" }],
  openGraph: {
    title: "Animesh Pandey — Building Enterprise AI That Scales",
    description:
      "Senior GenAI Engineer specializing in Conversational AI, GCP, Vertex AI, and enterprise-scale AI deployments.",
    url: "https://animeshpandey.in",
    siteName: "Animesh Pandey",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animesh Pandey — Building Enterprise AI That Scales",
    description:
      "Senior GenAI Engineer specializing in Conversational AI, GCP, Vertex AI, and enterprise-scale AI deployments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
