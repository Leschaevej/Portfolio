import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const emailLimiter = new Map<string, number[]>();
const MAX_EMAILS_PER_HOUR = 3;
const HOUR_IN_MS = 60 * 60 * 1000;
setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of emailLimiter.entries()) {
        const recent = timestamps.filter(t => now - t < HOUR_IN_MS);
        if (recent.length === 0) {
            emailLimiter.delete(ip);
        } else {
            emailLimiter.set(ip, recent);
        }
    }
}, HOUR_IN_MS);
function getClientIP(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIP = req.headers.get('x-real-ip');
    return forwarded?.split(',')[0].trim() || realIP || 'unknown';
}
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
}
function sanitizeString(str: string, maxLength: number): string {
    return str.trim().slice(0, maxLength);
}
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
export async function POST(req: Request) {
    try {
        const clientIP = getClientIP(req);
        const now = Date.now();
        const timestamps = emailLimiter.get(clientIP) || [];
        const recentTimestamps = timestamps.filter(t => now - t < HOUR_IN_MS);
        if (recentTimestamps.length >= MAX_EMAILS_PER_HOUR) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Trop de demandes. Réessayez dans 1 heure.'
                }),
                { status: 429 }
            );
        }
        const body = await req.json();
        const { email } = body;
        if (!email) {
            return new Response(
                JSON.stringify({ success: false, message: 'Email requis' }),
                { status: 400 }
            );
        }
        if (!isValidEmail(email)) {
            return new Response(
                JSON.stringify({ success: false, message: 'Format email invalide' }),
                { status: 400 }
            );
        }
        const sanitizedEmail = sanitizeString(email, 254);
        const escapedEmail = escapeHtml(sanitizedEmail);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            timeout: 10000,
        } as SMTPTransport.Options);
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            replyTo: sanitizedEmail,
            subject: 'Contact Portfolio',
            text: `${sanitizedEmail} veut te contacter !`,
            html: `
                <h3>Nouveau contact depuis le portfolio</h3>
                <p><strong>${escapedEmail}</strong> veut te contacter !</p>
                <p><em>Réponds directement à cet email pour le contacter.</em></p>
            `,
        });
        recentTimestamps.push(now);
        emailLimiter.set(clientIP, recentTimestamps);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        if (error instanceof SyntaxError) {
            return new Response(
                JSON.stringify({ success: false, message: 'Format JSON invalide' }),
                { status: 400 }
            );
        }
        return new Response(
            JSON.stringify({ success: false, message: 'Erreur serveur' }),
            { status: 500 }
        );
    }
}