import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MMF Limpezas | Limpeza pós-obra",
    template: "%s | MMF Limpezas",
  },
  description:
    "Limpeza pós-obra para construtoras e grandes espaços comerciais, com coordenação próxima e atenção à entrega.",
  keywords: [
    "limpeza pós-obra",
    "limpeza para construtoras",
    "limpeza de lojas",
    "limpeza comercial",
  ],
  openGraph: {
    description:
      "Limpeza pós-obra para construtoras e grandes espaços comerciais.",
    locale: "pt_BR",
    siteName: "MMF Limpezas",
    title: "MMF Limpezas | Limpeza pós-obra",
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#173DED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="antialiased" lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
