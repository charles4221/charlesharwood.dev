import clsx from 'clsx';

import { PolymorphicComponentProp } from '@/utils/type-helpers';

const Y_PADDING_CLASSNAME_MAP: {
  [key in ContainerProps['yPadding']]: string;
} = {
  xs: 'py-4 md:py-5',
  sm: 'py-8 md:py-10',
  md: 'py-12 md:py-16',
  lg: 'py-20 md:py-28',
  xl: 'py-32 md:py-48',
};

type ContainerProps = {
  yPadding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  collapsible?: boolean;
  className?: string;
};

export function Container<AsComponent extends React.ElementType = 'div'>({
  as,
  yPadding = 'lg',
  collapsible = true,
  className,
  children,
  ...rest
}: PolymorphicComponentProp<AsComponent, ContainerProps>) {
  const Component = as || 'div';

  return (
    <Component
      data-collapsible={collapsible}
      className={clsx('px-10', Y_PADDING_CLASSNAME_MAP[yPadding], className)}
      {...rest}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Component>
  );
}
