import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.scss";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Intro from './components/intro/Intro';
import { instrumentSans } from './fonts';

interface SiteConfig {
    url: string;
    name: string;
    title: string;
    description: string;
}
interface PersonInfo {
    name: string;
    givenName: string;
    familyName: string;
    jobTitle: string;
    github: string;
    linkedin: string;
}
const SITE_CONFIG: SiteConfig = {
    url: 'https://jimmyhub.fr',
    name: 'Jimmyhub',
    title: 'Jimmy Leschaeve - Développeur Fullstack Créatif',
    description: 'Portfolio de Jimmy Leschaeve, développeur fullstack créatif spécialisé dans la création d\'interfaces épurées et de logiciels optimisés. Mon objectif : l\'efficacité au service de l\'innovation.',
};
const PERSON_INFO: PersonInfo = {
    name: 'Jimmy Leschaeve',
    givenName: 'Jimmy',
    familyName: 'Leschaeve',
    jobTitle: 'Développeur Fullstack',
    github: 'https://github.com/Leschaevej',
    linkedin: 'https://www.linkedin.com/in/jimmy-leschaeve-11728a168/',
};
export const metadataBase = new URL(SITE_CONFIG.url);
export const metadata: Metadata = {
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        'développeur fullstack',
        'portfolio développeur',
        'développeur web',
        'développeur javascript',
        'développeur typescript',
        'développeur react',
        'développeur next.js',
        'développeur frontend',
        'développeur backend',
        'développeur créatif',
        'Jimmy Leschaeve',
        'Jimmyhub',
        'interfaces modernes',
        'logiciels optimisés',
    ],
    authors: [{ name: PERSON_INFO.name, url: SITE_CONFIG.url }],
    creator: PERSON_INFO.name,
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'profile',
        locale: 'fr_FR',
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [{
            url: `${SITE_CONFIG.url}/social.webp`,
            width: 1200,
            height: 630,
            alt: `${PERSON_INFO.name} - Portfolio`,
        }],
        firstName: PERSON_INFO.givenName,
        lastName: PERSON_INFO.familyName,
        username: 'Leschaevej',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [`${SITE_CONFIG.url}/social.webp`],
    },
    alternates: {
        canonical: SITE_CONFIG.url,
        languages: { 'fr-FR': SITE_CONFIG.url },
    },
};
export const viewport = {
    width: 'device-width',
    initialScale: 1,
};
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}#person`,
    name: PERSON_INFO.name,
    givenName: PERSON_INFO.givenName,
    familyName: PERSON_INFO.familyName,
    jobTitle: PERSON_INFO.jobTitle,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/social.webp`,
    description: SITE_CONFIG.description,
    sameAs: [
        PERSON_INFO.github,
        PERSON_INFO.linkedin,
    ],
    knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Web Development',
        'Frontend Development',
        'Backend Development',
        'Fullstack Development',
    ],
};
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    author: {
        '@type': 'Person',
        name: PERSON_INFO.name,
    },
};
const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.url}#profilepage`,
    mainEntity: {
        '@id': `${SITE_CONFIG.url}#person`,
    },
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <meta name="theme-color" content="#7bce3f" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
                <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="dns-prefetch" href="https://vercel.live" />
                <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
            </head>
            <body className={instrumentSans.className}>
                <Intro />
                <Header />
                {children}
                <Footer />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}