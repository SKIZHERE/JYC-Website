import { Inter } from "next/font/google"
import { ThemeProvider } from "@/lib/ThemeContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "JYC — JIIT Youth Club",
  description:
    "JYC is the JIIT Youth Club — a student-run community at Jaypee Institute of Information Technology, Sector 62 fostering innovation, culture, and social impact.",
  keywords: [
    "JYC",
    "JIIT Youth Club",
    "JIIT",
    "student club",
    "hackathon",
    "social impact",
  ],
  metadataBase: new URL("https://jyc.jiit.ac.in"),
  icons: {
    icon: "/images/logos/jyc-logo.jpg",
    apple: "/images/logos/jyc-logo.jpg",
  },
  openGraph: {
    title: "JYC — JIIT Youth Club",
    description:
      "The JIIT Youth Club — a student-run community for innovation, culture, and social impact.",
    url: "https://jyc.jiit.ac.in",
    siteName: "JYC — JIIT Youth Club",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JYC — JIIT Youth Club",
    description:
      "The JIIT Youth Club — a student-run community for innovation, culture, and social impact.",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("jyc-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "JIIT Youth Club",
              alternateName: "JYC",
              url: "https://jyc.jiit.ac.in",
              description:
                "The JIIT Youth Club is a student-run community at JIIT Sector 62 fostering innovation, culture, and social impact.",
              parentOrganization: {
                "@type": "CollegeOrUniversity",
                name: "Jaypee Institute of Information Technology",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}