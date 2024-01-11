import type { PropsWithChildren } from 'react';

type ConditionalWrapProps = PropsWithChildren<{
  condition: boolean;
  wrap: React.ElementType;
}>;

/**
 * Adds a wrapper around children if a condition is true.
 */
export function ConditionalWrap({
  condition,
  wrap: Wrap,
  children,
}: ConditionalWrapProps) {
  return condition ? <Wrap>{children}</Wrap> : children;
}
