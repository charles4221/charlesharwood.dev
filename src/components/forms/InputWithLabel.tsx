import { ComponentProps } from 'react';

import { Input } from './Input';
import { Label } from './Label';

export function InputWithLabel({
  label,
  wrapperClassName,
  invalidMessage,
  ...props
}: ComponentProps<typeof Input> & {
  label: string;
  wrapperClassName?: string;
  invalidMessage?: string;
}) {
  return (
    <div
      className={wrapperClassName}
      data-testid="input-with-label-wrapper-test-id">
      <Label htmlFor={props.id}>
        {label}
        {props.required ? (
          <span className="text-red-600 font-semibold"> *</span>
        ) : null}
      </Label>
      <Input
        name={props.id}
        aria-required={props.required ? 'true' : 'false'}
        {...props}
      />
      {invalidMessage ? (
        <span className="text-red-600 font-semibold">{invalidMessage}</span>
      ) : null}
    </div>
  );
}
