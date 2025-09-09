import {
  IconDefinition,
  faGithub,
  faLinkedin,
  faMastodon,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { Button } from './Button';

type SocialLink = {
  title: string;
  icon: IconDefinition;
  href: string;
  slug: string;
};

const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'Find me on GitHub',
    icon: faGithub,
    href: 'https://github.com/charles4221',
    slug: 'github',
  },
  {
    title: 'Find me on LinkedIn',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/charles-harwood-94511b38',
    slug: 'linkedin',
  },
  {
    title: 'Find me on Mastodon',
    icon: faMastodon,
    href: 'https://mastodon.social/@lordofbacon',
    slug: 'mastodon',
  },
  {
    title: 'Find me on Spotify',
    icon: faSpotify,
    href: 'https://open.spotify.com/user/22rloqf6zlymfmgdebyhmg2ia',
    slug: 'spotify',
  },
];

function SocialLinkItem({
  title,
  href,
  icon,
  isExpanded = false,
  slug,
}: SocialLink & { isExpanded?: boolean }) {
  return (
    <li key={title}>
      <span className="hover:text-teal-500 active:text-teal-400 dark:hover:text-teal-300 transition-colors">
        <a
          href={href}
          title={title}
          target="_blank"
          rel={slug === 'mastodon' ? 'me' : 'noopener noreferrer'}
          data-umami-event="Social link"
          data-umami-event-title={title}>
          <FontAwesomeIcon icon={icon} width={24} size="xl" />
          {isExpanded ? <span> {title}</span> : null}
        </a>
      </span>
    </li>
  );
}

function renderSocialLink(item: SocialLink, isExpanded = false) {
  return <SocialLinkItem key={item.title} isExpanded={isExpanded} {...item} />;
}

type SocialLinksProps = {
  isExpanded?: boolean;
};

export function SocialLinks({ isExpanded = false }: SocialLinksProps) {
  return (
    <nav>
      <ul className={clsx('flex flex-wrap gap-5', isExpanded && 'flex-col')}>
        {FOOTER_SOCIAL_LINKS.map((item) => renderSocialLink(item, isExpanded))}
      </ul>
      {isExpanded ? (
        <Button variant="sky" isCTA href="/contact" className="mt-10 text-2xl">
          <FontAwesomeIcon icon={faEnvelope} /> Send me an email
        </Button>
      ) : null}
    </nav>
  );
}
