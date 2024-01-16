import { asText } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import clsx from 'clsx';

import { createClient } from '@/prismic-config';
import { FONT_VT_323 } from '@/theme/fonts';

import { Container } from './Container';
import { NavLink } from './NavLink';
import type {
  NavigationDocumentDataLinksItem,
  Simplify,
} from '../../../prismicio-types';
import { SocialLinks } from '../links/SocialLinks';
import { DarkModeSetting } from '../settings/DarkModeSetting';
import { Heading } from '../typography/Heading';

function renderNavItem(item: Simplify<NavigationDocumentDataLinksItem>) {
  return <NavLink key={asText(item.label)} item={item} />;
}

export async function Header() {
  const client = createClient();
  const navigation = await client.getSingle('navigation');

  return (
    <Container
      as="header"
      yPadding="xs"
      className={clsx(
        'bg-sky-950 text-white uppercase shadow-2xl sticky top-0 z-10 backdrop-blur-lg bg-opacity-75',
        FONT_VT_323.className,
      )}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicNextLink href="/">
          <Heading
            as="h2"
            size="md"
            className="hover:text-sky-300"
            hasHoverShadowTransition>
            Charles Harwood
          </Heading>
          <p className="text-lg">Gold Coast web and mobile app developer</p>
        </PrismicNextLink>
        <div className="flex flex-grow lg:flex-grow-0 items-center justify-between gap-x-6">
          <nav>
            <ul className="flex flex-wrap gap-6 md:gap-10">
              {navigation.data?.links.map(renderNavItem)}
            </ul>
          </nav>
          <SocialLinks />
          <DarkModeSetting />
        </div>
      </div>
    </Container>
  );
}
