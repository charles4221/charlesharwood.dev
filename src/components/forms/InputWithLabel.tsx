import { ComponentProps } from 'react';

import { Input } from './Input';
import { Label } from './Label';

export function InputWithLabel({
  label,
  wrapperClassName,
  isValid,
  ...props
}: ComponentProps<typeof Input> & {
  label: string;
  wrapperClassName?: string;
  isValid?: boolean;
}) {
  return (
    <div className={wrapperClassName}>
      <Label
        htmlFor={props.id}
        aria-required={props.required ? 'true' : 'false'}>
        {label}
        {props.required ? (
          <span className="text-red-600 font-semibold"> *</span>
        ) : null}
      </Label>
      <Input name={props.id} {...props} />
      {isValid === false ? (
        <span className="text-red-600 font-semibold">
          {'type' in props && props.type === 'email'
            ? 'Please enter a valid email address.'
            : 'This field is required.'}
        </span>
      ) : null}
    </div>
  );
}
