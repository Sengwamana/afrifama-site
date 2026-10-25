import { LegalPage } from '@/components/Pages';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'The terms on which this Afrifama website is provided and used.',
  path: '/terms-of-use',
});

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms of use."
      intro="The ground rules for using this website and the information published on it."
      image="/images/film-frame-03.jpg"
      sections={[
        {
          heading: 'Using this site',
          paragraphs: [
            'By using this website you agree to use it lawfully and in a way that does not infringe the rights of, or restrict the use of this site by, anyone else.',
          ],
        },
        {
          heading: 'Information on this site',
          paragraphs: [
            'The content on this site is provided for general information about Afrifama and our poultry products, farmer support programmes and operations. We work to keep it accurate and current, but product availability, specifications and pricing are confirmed by our team directly and may change without notice.',
            'Nothing on this site constitutes a binding offer, contract or professional advice. Always confirm details with Afrifama before making purchasing or farming decisions.',
          ],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            'Unless stated otherwise, the Afrifama name, logo, written content and imagery on this site belong to Afrifama or are used with the owner’s permission. You may view and share links to this site, but you may not reproduce or use our brand assets commercially without written permission.',
          ],
        },
        {
          heading: 'External links',
          paragraphs: [
            'This site may link to third-party websites. Those sites are operated by others and we are not responsible for their content, availability or privacy practices.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'We provide this site on an “as is” basis. To the extent permitted by law, Afrifama is not liable for losses arising from reliance on the general information published here, or from interruptions, errors or unavailability of the site.',
          ],
        },
        {
          heading: 'Changes and governing law',
          paragraphs: [
            'We may update these terms from time to time by publishing a revised version on this page. These terms are governed by the laws of Kenya.',
          ],
        },
        {
          heading: 'Contact us',
          paragraphs: [
            'Questions about these terms can be sent to us using the contact details on this page.',
          ],
        },
      ]}
    />
  );
}
