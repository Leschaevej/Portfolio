'use client';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import NavetteSVG from '../assets/navette.svg';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    if (!email.trim()) {
      setError("L'email est requis.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("L'email n'est pas valide.");
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      console.error('Erreur envoi email :', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form">
      <div className="email-container">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Un petit pas pour vous..."
          aria-invalid={error ? 'true' : 'false'}
          autoComplete="email"
          required
          className={`email-input ${error ? 'input-error' : ''}`}
        />
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className={`submit-button ${status}`}
          aria-label="Envoyer"
        >
          <NavetteSVG />
        </button>
      </div>
      {error && <span className="error">{error}</span>}
    </form>
  );
}