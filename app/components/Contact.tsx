'use client';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Le nom est requis.';
    if (!form.email.trim()) {
        newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "L'email n'est pas valide.";
    }
    if (!form.message.trim()) newErrors.message = 'Le message est requis.';
        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    const templateParams = {
        from_name: form.name,
        from_email: form.email,
        reply_to: form.email,
        content: form.message,
    };
    try {
        await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => {
        setStatus('idle');
        }, 2000);
        } catch (error) {
            console.error('Erreur envoi email :', error);
            setStatus('error');
            setTimeout(() => {
            setStatus('idle');
            }, 2000);
        }
    };
    return (
        <form onSubmit={handleSubmit} noValidate>
        <label>
            Nom
            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : 'false'}
            autoComplete="name"
            required/>
            {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
            Email
            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            autoComplete="email"
            required/>
            {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
            Message
            <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : 'false'}
            required/>
            {errors.message && <span className="error">{errors.message}</span>}
        </label>
        <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className={status === 'success' ? 'success' : status === 'error' ? 'error' : ''}>
            {status === 'idle' && 'Envoyer'}
            {status === 'sending' && 'Envoi...'}
            {status === 'success' && 'Succès !'}
            {status === 'error' && 'Erreur, réessayer'}
        </button>
        </form>
    );
}