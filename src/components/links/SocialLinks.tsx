import {
  IconDefinition,
  faGithub,
  faLinkedin,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SocialLink = {
  title: string;
  icon: IconDefinition;
  href: string;
};

const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'Charles Harwood on GitHub',
    icon: faGithub,
    href: 'https://github.com/charles4221',
  },
  {
    title: 'Charles Harwood on LinkedIn',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/charles-harwood-94511b38',
  },
  {
    title: 'Charles Harwood on Spotify',
    icon: faSpotify,
    href: 'https://open.spotify.com/user/22rloqf6zlymfmgdebyhmg2ia',
  },
];

function SocialLinkItem({ title, href, icon }: SocialLink) {
  return (
    <li
      key={title}
      className="font-semibold hover:text-teal-300 active:text-teal-400">
      <a href={href} title={title} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={icon} size="xl" />
      </a>
    </li>
  );
}

function renderSocialLink(item: SocialLink) {
  return <SocialLinkItem key={item.title} {...item} />;
}

export function SocialLinks() {
  return (
    <nav>
      <ul className="flex flex-wrap gap-5">
        {FOOTER_SOCIAL_LINKS.map(renderSocialLink)}
      </ul>
    </nav>
  );
}
