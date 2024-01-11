import clsx from 'clsx';

import { PolymorphicComponentProp } from '@/utils/type-helpers';

const SIZE_CLASSNAME_MAP: {
  [key in HeadingProps['size']]: string;
} = {
  xl: 'text-6xl md:text-8xl',
  lg: 'text-5xl md:text-6xl',
  md: 'text-4xl md:text-5xl',
  sm: 'text-3xl md:text-4xl',
};

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
        SIZE_CLASSNAME_MAP[size],
        hasHoverShadowTransition && 'heading--shadow-transition',
        className,
      )}>
      {children}
    </Component>
  );
}
