import { FaLinkedin, FaGithub, FaMoon, FaCog  } from 'react-icons/fa';
import { instrumentSans } from '@/app/fonts';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
        <div className={`logo ${instrumentSans.className}`}>Jim.</div>
        <p>©copyright 2025</p> 
    </footer>
  );
}