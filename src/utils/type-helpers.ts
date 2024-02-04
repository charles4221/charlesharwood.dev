type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props extends object,
> = React.PropsWithChildren<Props> &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

declare global {
  interface Window {
    __theme: 'dark' | 'light';
    __setPreferredTheme?: (theme: 'dark' | 'light') => void;
  }
}
