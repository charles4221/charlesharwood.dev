'use client';
import { memo } from 'react';

import { PrismicNextLink } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import clsx from 'clsx';

import { useIsActivePage } from '@/hooks/useIsActivePage';

import {
  NavigationDocumentDataLinksItem,
  Simplify,
} from '../../../prismicio-types';

type NavLinkProps = Simplify<NavigationDocumentDataLinksItem>;

export const NavLink = memo(function NavLink({ label, link }: NavLinkProps) {
  const isActivePage = useIsActivePage(link);

  return (
    <li
      className={clsx(
        'text-xl tracking-wide hover:text-teal-300 active:text-teal-400',
        isActivePage && 'text-teal-400',
      )}>
      <PrismicNextLink field={link}>
        <PrismicText field={label} />
      </PrismicNextLink>
    </li>
  );
});
