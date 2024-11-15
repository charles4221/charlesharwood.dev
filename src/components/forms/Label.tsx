import type { JSX } from 'react';
export function Label(props: JSX.IntrinsicElements['label']) {
  return <label className="block mb-2" {...props} />;
}
