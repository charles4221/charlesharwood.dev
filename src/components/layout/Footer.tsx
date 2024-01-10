import { faLinkedin, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container } from '../Container';

const FOOTER_SOCIAL_LINKS = [
  {
    title: 'LinkedIn',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/charles-harwood-94511b38',
  },
  {
    title: 'Spotify',
    icon: faSpotify,
    href: 'https://open.spotify.com/user/22rloqf6zlymfmgdebyhmg2ia',
  },
];

export function Footer() {
  return (
    <Container as="footer" yPadding="xs" className="bg-sky-950 text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <div>
          <p className="mb-7 last:mb-0">
            Handcrafted with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500" /> in Gold
            Coast, Australia.
          </p>
          <p className="mb-7 last:mb-0">
            &copy; {new Date().getFullYear()} Charles Harwood. All rights
            reserved.
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-3">
            {FOOTER_SOCIAL_LINKS.map((link) => {
              return (
                <li
                  key={link.title}
                  className="font-semibold hover:text-teal-300 active:text-teal-400">
                  <a
                    href={link.href}
                    title={link.title}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FontAwesomeIcon icon={link.icon} size="lg" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
