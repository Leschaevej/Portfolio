import { FaLinkedin, FaGithub, FaMoon, FaCog  } from 'react-icons/fa';
import { pacifico } from '@/app/fonts';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
        <div className={`logo ${pacifico.className}`}>Jim.</div>
        <p>© 2025 Jimmy Leschaeve, Tous droits réservés.</p>
        <div className="links">
            <a href="https://github.com/Leschaevej" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="icon-link">
                <FaGithub className="icon" />
            </a>
            <a href="www.linkedin.com/in/jimmy-leschaeve-11728a168" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="icon-link">
                <FaLinkedin className="icon" />
            </a>
        </div>  
    </footer>
  );
}