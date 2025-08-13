import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.scss";
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { instrumentSans } from './fonts';

export const metadata: Metadata = {
    title: "Jimmyhub",
    description: "Bienvenue sur mon portfolio professionnel présentant mes projets et compétences.",
    icons: {
        icon: './favicon.ico',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={instrumentSans.className}>
                <Intro />
                    <Header />
                        <main>
                            {children}
                        </main>
                    <Footer />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}