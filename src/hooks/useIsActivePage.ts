import { LinkField, asLink } from '@prismicio/client';
import { usePathname } from 'next/navigation';

export function useIsActivePage(link: LinkField): boolean {
  const pathname = usePathname();
  const isActivePage = pathname === asLink(link);

  return isActivePage;
}
