import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container } from './Container';
import { PlainLink } from '../links/PlainLink';
import { SocialLinks } from '../links/SocialLinks';

export function Footer() {
  return (
    <Container as="footer" yPadding="md" className="bg-sky-950 text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-10 leading-none">
        <div>
          <p className="mb-3">
            Handcrafted with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-600" /> in Gold
            Coast, Australia.
          </p>
          <p className="mb-3">
            &copy; {new Date().getFullYear()} Charles Harwood. All rights
            reserved.
          </p>
        </div>

        <SocialLinks />

        <p>
          <PlainLink
            href="https://github.com/charles4221/charlesharwood.dev"
            target="_blank">
            View this website&rsquo;s source code!
          </PlainLink>
        </p>
      </div>
    </Container>
  );
}
