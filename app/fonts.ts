import { Instrument_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});