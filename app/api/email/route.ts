import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Champs manquants' }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        replyTo: email,
        subject: 'Contact Portfolio',
        text: `Il y a ${email} qui te cherche`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Erreur envoi email :', error);
    return new Response(JSON.stringify({ success: false, message: 'Erreur serveur' }), { status: 500 });
  }
}
