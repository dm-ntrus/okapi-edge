import { Resend } from 'resend';

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getAppUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function getNewsletterFrom() {
  return process.env.NEWSLETTER_FROM?.trim() || 'Okapi Edge <onboarding@resend.dev>';
}

function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string; offline?: boolean };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendEmailResult> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, offline: true, error: 'RESEND_API_KEY manquant — envoi désactivé' };
  }
  try {
    const { data, error } = await resend.emails.send({
      from: getNewsletterFrom(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id ?? '' };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'SEND_FAILED' };
  }
}

function wrapHtml(opts: {
  locale: string;
  preheader?: string | null;
  bodyHtml: string;
  unsubscribeUrl?: string;
}) {
  const isEn = opts.locale === 'en';
  const unsub = opts.unsubscribeUrl
    ? `<p style="margin:24px 0 0;font-size:12px;color:#8a7a6a;text-align:center;">
        <a href="${opts.unsubscribeUrl}" style="color:#c4a574;text-decoration:underline;">
          ${isEn ? 'Unsubscribe' : 'Se désabonner'}
        </a>
      </p>`
    : '';
  const preheader = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${opts.preheader}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="${opts.locale}">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#1a1410;color:#f5f0e8;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1410;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#241c16;border:1px solid rgba(232,220,200,0.14);border-radius:12px;overflow:hidden;">
        <tr><td style="padding:20px 28px;border-bottom:1px solid rgba(232,220,200,0.1);">
          <div style="font-size:18px;font-weight:700;color:#f5f0e8;letter-spacing:-0.02em;">Okapi Edge</div>
          <div style="font-size:11px;color:#8a7a6a;margin-top:4px;text-transform:uppercase;letter-spacing:0.12em;">Newsletter</div>
        </td></tr>
        <tr><td style="padding:28px;font-size:15px;line-height:1.6;color:#c4b5a5;">
          ${opts.bodyHtml}
        </td></tr>
        <tr><td style="padding:0 28px 28px;">
          ${unsub}
          <p style="margin:12px 0 0;font-size:11px;color:#8a7a6a;text-align:center;">
            © ${new Date().getFullYear()} Okapi Edge.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildConfirmEmail(opts: {
  locale: string;
  confirmUrl: string;
  email: string;
}) {
  const isEn = opts.locale === 'en';
  const body = isEn
    ? `<p>Thanks for subscribing to the Okapi Edge newsletter.</p>
       <p>Please confirm your email address to activate your subscription:</p>
       <p style="margin:24px 0;"><a href="${opts.confirmUrl}" style="display:inline-block;background:#c4a574;color:#1a1410;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:8px;">Confirm subscription</a></p>
       <p style="font-size:13px;color:#94a3b8;">If you did not request this, you can ignore this email.</p>`
    : `<p>Merci de votre intérêt pour la newsletter Okapi Edge.</p>
       <p>Confirmez votre adresse e-mail pour activer votre abonnement :</p>
       <p style="margin:24px 0;"><a href="${opts.confirmUrl}" style="display:inline-block;background:#c4a574;color:#1a1410;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:8px;">Confirmer mon abonnement</a></p>
       <p style="font-size:13px;color:#94a3b8;">Si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail.</p>`;

  return {
    subject: isEn ? 'Confirm your Okapi Edge newsletter' : 'Confirmez votre newsletter Okapi Edge',
    html: wrapHtml({ locale: opts.locale, bodyHtml: body }),
  };
}

export function buildCampaignEmail(opts: {
  locale: string;
  subject: string;
  preheader?: string | null;
  htmlBody: string;
  unsubscribeUrl: string;
}) {
  return {
    subject: opts.subject,
    html: wrapHtml({
      locale: opts.locale,
      preheader: opts.preheader,
      bodyHtml: opts.htmlBody,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
  };
}

export async function sendConfirmEmail(opts: {
  to: string;
  locale: string;
  confirmToken: string;
}) {
  const confirmUrl = `${getAppUrl()}/${opts.locale}/newsletter/confirm?token=${opts.confirmToken}`;
  const mail = buildConfirmEmail({
    locale: opts.locale,
    confirmUrl,
    email: opts.to,
  });
  return sendEmail({ to: opts.to, subject: mail.subject, html: mail.html });
}

export async function sendCampaignEmail(opts: {
  to: string;
  locale: string;
  subject: string;
  preheader?: string | null;
  htmlBody: string;
  unsubscribeToken: string;
}) {
  const unsubscribeUrl = `${getAppUrl()}/${opts.locale}/newsletter/unsubscribe?token=${opts.unsubscribeToken}`;
  const mail = buildCampaignEmail({
    locale: opts.locale,
    subject: opts.subject,
    preheader: opts.preheader,
    htmlBody: opts.htmlBody,
    unsubscribeUrl,
  });
  return sendEmail({ to: opts.to, subject: mail.subject, html: mail.html });
}
