import clsx from 'clsx';

import { PolymorphicComponentProp } from '@/utils/type-helpers';

const SIZE_CLASSNAME_MAP: {
  [key in HeadingProps['size']]: string;
} = {
  xl: 'text-6xl md:text-8xl',
  lg: 'text-5xl md:text-6xl',
  md: 'text-4xl md:text-5xl',
  sm: 'text-3xl md:text-4xl',
  xs: 'text-xl md:text-2xl',
};

type HeadingPropsBase = {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
};

type HeadingPropsDisplay = HeadingPropsBase & {
  isDisplay: true;
  hasHoverShadowTransition?: boolean;
};

type HeadingPropsSans = HeadingPropsBase & {
  isDisplay?: false;
};

type HeadingProps = HeadingPropsDisplay | HeadingPropsSans;

export function Heading<AsComponent extends React.ElementType = 'h1'>({
  as,
  size = 'lg',
  children,
  className,
  hasHoverShadowTransition,
  isDisplay = true,
}: PolymorphicComponentProp<AsComponent, HeadingProps>) {
  const Component = as || 'h1';

  return (
    <Component
      className={clsx(
        isDisplay ? 'heading' : 'font-sans',
        SIZE_CLASSNAME_MAP[size],
        hasHoverShadowTransition && 'heading--shadow-transition',
        className,
      )}>
      {children}
    </Component>
  );
}
