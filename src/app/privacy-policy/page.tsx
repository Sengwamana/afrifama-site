import { LegalPage } from '@/components/Pages';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Afrifama collects, uses and protects the information you share when you contact us through this website.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy policy."
      intro="What we collect when you contact Afrifama, why we collect it, and the choices you have."
      image="/images/film-frame-02.jpg"
      sections={[
        {
          heading: 'What we collect',
          paragraphs: [
            'When you send an enquiry through this website, we receive the details you choose to share: your name, email address, phone number (if you provide one), the type of enquiry, the product you are asking about and the message you write.',
            'Our server also records basic technical information needed to deliver the form safely, such as your IP address, which is used only to limit abusive or automated submissions.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: ['We use your details for one purpose: to respond to you.'],
          list: [
            'To answer questions about day-old chicks, poultry feed, farmer support or partnerships',
            'To follow up on a quote or partnership request you have made',
            'To keep a record of our correspondence with you',
          ],
        },
        {
          heading: 'Who processes it',
          paragraphs: [
            'Enquiry emails are delivered through Resend, an email delivery service, to the Afrifama inbox. Your details are not sold, rented or shared with advertisers, and we do not use your information for marketing unless you separately ask us to.',
          ],
        },
        {
          heading: 'Cookies and tracking',
          paragraphs: [
            'This website does not use advertising, profiling or analytics cookies. It sets no tracking technologies beyond what the browser and server need to display the pages you request. Fonts and images are served from our own hosting rather than third-party trackers.',
          ],
        },
        {
          heading: 'How long we keep it',
          paragraphs: [
            'Enquiry emails are retained for as long as they are useful for correspondence and record-keeping, then deleted. You can ask us to delete your message at any time.',
          ],
        },
        {
          heading: 'Your choices',
          paragraphs: [
            'You may choose not to fill in the contact form and to call or email us directly instead. You may also ask what information we hold about you, request a correction, or ask us to delete it by contacting us using the details on this page.',
          ],
        },
        {
          heading: 'Questions about this policy',
          paragraphs: [
            'This policy covers this website only. If anything here is unclear, please get in touch — we would rather explain it than leave it vague.',
          ],
        },
      ]}
    />
  );
}
