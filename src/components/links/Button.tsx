import { ComponentProps, type JSX } from 'react';

import { LinkField } from '@prismicio/client';
import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next';
import clsx from 'clsx';

import { PlainLink } from './PlainLink';

type ButtonVariants = 'teal' | 'sky' | 'white';

type ButtonVariantConfig = {
  [key in ButtonVariants]: { className: string; textColor: string };
};

const buttonVariantConfig: ButtonVariantConfig = {
  teal: {
    className: 'bg-teal-400 hover:bg-teal-300 active:bg-teal-400',
    textColor: 'text-slate-900',
  },
  sky: {
    className: 'bg-sky-300 hover:bg-sky-400 active:bg-sky-500',
    textColor: 'text-slate-900',
  },
  white: {
    className:
      'bg-white hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-950 dark:hover:bg-slate-800 dark:active:bg-slate-700',
    textColor: 'text-slate-900 dark:text-white',
  },
};

type ButtonBaseProps = {
  variant?: ButtonVariants;
  isCTA?: boolean;
  isCompact?: boolean;
  isRounded?: boolean;
};

type RegularButtonProps = JSX.IntrinsicElements['button'] & ButtonBaseProps;
type AnchorButtonProps = ComponentProps<typeof PlainLink> & ButtonBaseProps;
type LinkButtonProps = PrismicNextLinkProps &
  ButtonBaseProps & { field: LinkField };
type ButtonProps = RegularButtonProps | AnchorButtonProps | LinkButtonProps;

export function Button({
  variant = 'sky',
  isCTA = false,
  isCompact = false,
  isRounded = false,
  className: classNameFromProps,
  ...props
}: ButtonProps) {
  const { className, textColor } = buttonVariantConfig[variant];
  const compiledClassName = clsx(
    'button',
    className,
    textColor,
    isCompact ? 'px-2 py-1' : 'px-5 py-3',
    isCTA && 'button--cta',
    isRounded && 'rounded-sm',
    classNameFromProps,
    'disabled' in props && props.disabled && 'opacity-50 cursor-not-allowed',
  );

  if ('field' in props) {
    return (
      <PrismicNextLink
        className={compiledClassName}
        {...props}
        // narrow away the `null` type on `prefetch` prop until Prismic updates it to match the updated type from Next.js
        prefetch={props.prefetch ?? undefined}
      />
    );
  }

  if ('href' in props) {
    return <PlainLink className={compiledClassName} {...props} />;
  }

  return <button className={compiledClassName} {...props} />;
}
