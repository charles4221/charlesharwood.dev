import type { JSX } from 'react';

export function Label({ htmlFor, ...rest }: JSX.IntrinsicElements['label']) {
  return <label className="block mb-2" htmlFor={htmlFor} {...rest} />;
}
