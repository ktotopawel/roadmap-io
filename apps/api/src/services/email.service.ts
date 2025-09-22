import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import { MissingEnvError } from '../errors/missingEnvError';
import type { EmailOptions } from '../types/emailService';

class EmailService {
  private static _instance: EmailService;
  private transporter: Transporter;
  private readonly from: string;

  private constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new MissingEnvError('Missing nodemailer api key');
    }

    if (!process.env.RESEND_FROM) {
      throw new MissingEnvError('Missing nodemailer "from" env variable');
    }

    this.from = process.env.RESEND_FROM;

    this.transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: apiKey,
      },
    });
  }

  public async sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      html,
    });
  }

  public static get instance(): EmailService {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!EmailService._instance) {
      EmailService._instance = new EmailService();
    }

    return EmailService._instance;
  }
}

export default EmailService;
