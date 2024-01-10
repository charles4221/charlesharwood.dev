import clsx from 'clsx';

import { PolymorphicComponentProp } from '@/utils/type-helpers';

type ContainerProps = {
  yPadding?: 'xs' | 'sm' | 'base' | 'lg';
  collapsible?: boolean;
  className?: string;
};

export function Container<AsComponent extends React.ElementType = 'div'>({
  as: As,
  yPadding = 'base',
  collapsible = true,
  className,
  children,
  ...rest
}: PolymorphicComponentProp<AsComponent, ContainerProps>) {
  const Component = As || 'div';

  return (
    <Component
      data-collapsible={collapsible}
      className={clsx(
        'px-6',
        yPadding === 'xs' && 'py-4 md:py-5',
        yPadding === 'sm' && 'py-8 md:py-10',
        yPadding === 'base' && 'py-20 md:py-28',
        yPadding === 'lg' && 'py-32 md:py-48',
        className,
      )}
      {...rest}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Component>
  );
}
