import { LinkField } from '@prismicio/client';
import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next';
import clsx from 'clsx';

type ButtonVariants = 'teal' | 'sky' | 'white';

type ButtonVariantConfig = {
  [key in ButtonVariants]: { className: string; textColor: string };
};

const buttonVariantConfig: ButtonVariantConfig = {
  teal: {
    className: 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800',
    textColor: 'text-white',
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
type LinkButtonProps = PrismicNextLinkProps &
  ButtonBaseProps & { field: LinkField };
type ButtonProps = RegularButtonProps | LinkButtonProps;

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
    isRounded && 'rounded',
    classNameFromProps,
  );

  return 'field' in props ? (
    <PrismicNextLink className={compiledClassName} {...props} />
  ) : (
    <button className={compiledClassName} {...props} />
  );
}
