'use client';

import { useState, FormEvent } from 'react';
import './Contact.scss';
import NavetteSVG from '../assets/navette.svg';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [shakeError, setShakeError] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Veuillez renseigner votre e-mail.");
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
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validate()) {
    return;
  }

  setStatus('sending');
  try {
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Utilisateur',
        email,
        message: 'Formulaire rapide',
      }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
      setEmail('');
    } else {
      throw new Error('Échec envoi');
    }
  } catch (error) {
    console.error('Erreur envoi email :', error);
    setStatus('error');
  } finally {
    setTimeout(() => setStatus('idle'), 2000);
  }
};

  const placeholder = error || "Un petit pas pour vous...";

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form">
      <div
        className={`email-container ${
          (error || status === 'error') ? 'error-active' : ''
        } ${status === 'sending' ? 'sending' : ''} ${
          status === 'success' ? 'success' : ''
        }`}
      >
        <input
          type="email"
          name="email"
          value={
            status === 'sending'
              ? 'Vers l’infini...'
              : status === 'success'
              ? 'Communication établi !!'
              : status === 'error'
              ? 'Echec de la communication !!'
              : email
          }
          onChange={handleChange}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          autoComplete="email"
          required
          disabled={status === 'sending' || status === 'success'}
          className={`email-input ${error ? 'input-error' : ''} ${status}`}
        />
        <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className={`submit-button ${status} ${error ? 'error-active' : ''}`}
            aria-label="Envoyer"
            >
            <NavetteSVG />
        </button>
      </div>
    </form>
  );
}