import Link from 'next/link';
import './Footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <p className='name'>JIMMY<br />LESCHAEVE</p>
            <div className='right'>
                <Link href="/legal" className='legal'>Mentions Légales</Link>
                <p className='copyright'>©copyright 2026</p>
            </div>
        </footer>
    );
}