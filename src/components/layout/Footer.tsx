import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container } from './Container';
import { SocialLinks } from '../links/SocialLinks';

export function Footer() {
  return (
    <Container as="footer" yPadding="xs" className="bg-sky-950 text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <div>
          <p className="mb-7">
            Handcrafted with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500" /> in Gold
            Coast, Australia.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Charles Harwood. All rights
            reserved.
          </p>
        </div>
        <SocialLinks />
      </div>
    </Container>
  );
}
