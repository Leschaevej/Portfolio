'use client';

import { useState } from 'react';
import GitHub from '@/app/assets/github.svg';
import LinkedIn from '@/app/assets/linkedin.svg';
import Portfolio from '@/app/assets/logo.svg';
import Skybound from '@/app/assets/skyboundStudio.svg';
import { ANIMATION } from '@/app/constants';
import './Social.scss';

interface SocialLink {
    id: string;
    href: string;
    label: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    className: string;
}
const socialLinks: SocialLink[] = [
    {
        id: 'github',
        href: 'https://github.com/Leschaevej?tab=repositories',
        label: 'GitHub',
        Icon: GitHub,
        className: 'github',
    },
    {
        id: 'linkedin',
        href: 'https://linkedin.com/in/jimmy-leschaeve-11728a168/',
        label: 'LinkedIn',
        Icon: LinkedIn,
        className: 'linkedin',
    },
    {
        id: 'portfolio',
        href: 'https://jimmyhub.fr',
        label: 'Portfolio',
        Icon: Portfolio,
        className: 'portfolio',
    },
    {
        id: 'skybound',
        href: 'https://skyboundstudio.fr',
        label: 'Skybound Studio',
        Icon: Skybound,
        className: 'skybound',
    },
];
export default function Social() {
    const [tappedLink, setTappedLink] = useState<string | null>(null);
    const handleTouchStart = (id: string) => {
        setTappedLink(id);
        setTimeout(() => setTappedLink(null), ANIMATION.TAP_FEEDBACK);
    };
    return (
        <div className="socials">
            {socialLinks.map(({ id, href, label, Icon, className }) => (
                <a
                    key={id}
                    href={href}
                    className={`${className} ${tappedLink === id ? 'tapped' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onTouchStart={() => handleTouchStart(id)}
                >
                    <Icon />
                </a>
            ))}
        </div>
    );
}