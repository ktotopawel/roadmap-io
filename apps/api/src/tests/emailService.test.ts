import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import EmailService from '../services/email.service';

jest.mock('nodemailer');

describe('EmailService', () => {
  let sendMailMock: jest.Mock;
  let transporterMock: Partial<Transporter>;

  beforeAll(() => {
    sendMailMock = jest.fn().mockResolvedValue({});
    transporterMock = { sendMail: sendMailMock } as Partial<Transporter>;

    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);
  });

  beforeEach(() => {
    jest.resetModules();
    process.env.RESEND_API_KEY = 'fake-api-key';
    process.env.RESEND_FROM = 'from@example.com';
  });

  it('instantiates singleton correctly', () => {
    const instance1 = EmailService.instance;
    const instance2 = EmailService.instance;

    expect(instance1).toBe(instance2);
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: { user: 'resend', pass: 'fake-api-key' },
    });
  });

  it('sends an email using transporter.sendMail', async () => {
    const emailService = EmailService.instance;

    const emailData = {
      to: 'to@example.com',
      subject: 'Test Email',
      html: '<p>Hello</p>',
    };

    await emailService.sendEmail(emailData);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'from@example.com',
      ...emailData,
    });
  });
});
