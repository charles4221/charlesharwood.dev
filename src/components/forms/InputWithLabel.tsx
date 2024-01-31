import { ComponentProps } from 'react';

import { Input } from './Input';
import { Label } from './Label';

export function InputWithLabel(
  props: ComponentProps<typeof Input> & { label: string },
) {
  return (
    <div>
      <Label
        htmlFor={props.id}
        aria-required={props.required ? 'true' : 'false'}>
        {props.label}
        {props.required ? (
          <span className="text-red-600 font-semibold"> *</span>
        ) : null}
      </Label>
      <Input name={props.id} {...props} />
    </div>
  );
}
