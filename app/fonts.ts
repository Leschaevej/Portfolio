// app/fonts.ts
import { Pacifico, Roboto } from 'next/font/google';

export const pacifico = Pacifico({
  weight: '400', // seul poids disponible pour cette police
  subsets: ['latin'],
});

export const roboto = Roboto({
  weight: ['400', '700'], // ou selon tes besoins
  subsets: ['latin'],
  display: 'swap',
});