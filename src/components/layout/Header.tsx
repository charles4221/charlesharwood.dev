import { asText } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';

import { createClient } from '@/prismic-config';

import { Container } from './Container';
import type {
  NavigationDocumentDataLinksItem,
  Simplify,
} from '../../../prismicio-types';
import { NavLink } from '../links/NavLink';
import { SocialLinks } from '../links/SocialLinks';
import { DarkModeSetting } from '../settings/DarkModeSetting';
import { Heading } from '../typography/Heading';

function renderNavItem(item: Simplify<NavigationDocumentDataLinksItem>) {
  return <NavLink key={asText(item.label)} {...item} />;
}

export async function Header() {
  const client = createClient();
  const navigation = await client.getSingle('navigation');

  return (
    <Container
      as="header"
      yPadding="xs"
      className="font-headings bg-sky-950 text-white uppercase shadow-2xl sticky top-0 z-10 dark:backdrop-blur-lg dark:bg-opacity-75">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicNextLink href="/" className="group">
          <Heading
            as="h2"
            size="md"
            className="group-hover:text-sky-300"
            hasHoverShadowTransition>
            Charles Harwood
          </Heading>
          <p className="text-lg">Gold Coast mobile apps and websites</p>
        </PrismicNextLink>
        <div className="flex flex-grow lg:flex-grow-0 items-center justify-between gap-x-6">
          <nav>
            <ul className="flex flex-wrap gap-6 md:gap-10">
              {navigation.data.links.map(renderNavItem)}
            </ul>
          </nav>
          <div className="max-sm:hidden">
            <SocialLinks />
          </div>
          <DarkModeSetting />
        </div>
      </div>
    </Container>
  );
}
