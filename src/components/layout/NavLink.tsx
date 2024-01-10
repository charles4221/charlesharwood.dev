'use client';
import { asLink } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import {
  NavigationDocumentDataLinksItem,
  Simplify,
} from '../../../prismicio-types';

type NavLinkProps = {
  item: Simplify<NavigationDocumentDataLinksItem>;
};

export function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const isActivePage = pathname === asLink(item.link);

  return (
    <li
      className={clsx(
        'text-xl tracking-wide hover:text-teal-300 active:text-teal-400',
        isActivePage && 'text-teal-400',
      )}>
      <PrismicNextLink field={item.link}>
        <PrismicText field={item.label} />
      </PrismicNextLink>
    </li>
  );
}
