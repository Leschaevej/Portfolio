import Link from 'next/link';
import { instrumentSans } from './fonts';
import './globals.scss';
import './not-found.scss';

export default function NotFound() {
    return (
        <div className="notFound">
            <h1 className={instrumentSans.className}>404</h1>
            <h2>Page introuvable</h2>
            <p>
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
                Retournons sur la page d&apos;accueil pour reprendre l&apos;exploration.
            </p>
            <Link href="/" className="back">
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}