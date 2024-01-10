import clsx from 'clsx';

import { PolymorphicComponentProp } from '@/utils/type-helpers';

type HeadingProps = {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
  hasHoverShadowTransition?: boolean;
};

export function Heading<AsComponent extends React.ElementType = 'h1'>({
  as: As,
  size = 'lg',
  children,
  className,
  hasHoverShadowTransition,
}: PolymorphicComponentProp<AsComponent, HeadingProps>) {
  const Component = As || 'h1';

  return (
    <Component
      className={clsx(
        'heading',
        size === 'xl' && 'text-6xl md:text-8xl',
        size === 'lg' && 'text-5xl md:text-6xl',
        size === 'md' && 'text-4xl md:text-5xl',
        size === 'sm' && 'text-3xl md:text-4xl',
        hasHoverShadowTransition && 'heading--shadow-transition',
        className,
      )}>
      {children}
    </Component>
  );
}
