import { redirect } from 'next/navigation';

export default function LegacyNewsletterInboxRedirect() {
  redirect('/admin/newsletter/subscribers');
}
