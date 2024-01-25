import { ComponentProps } from 'react';

export function Label(props: JSX.IntrinsicElements['label']) {
  return <label className="block mb-2" {...props} />;
}

type InputProps = JSX.IntrinsicElements['input'];
type TextAreaProps = JSX.IntrinsicElements['textarea'] & { isTextArea: true };

function isTextAreaProps(
  props: InputProps | TextAreaProps,
): props is TextAreaProps {
  return 'isTextArea' in props && props.isTextArea;
}

export function Input(props: InputProps | TextAreaProps) {
  const className = 'block w-full rounded p-3 mb-6 bg-slate-100 text-slate-950';

  if (isTextAreaProps(props)) {
    const { isTextArea, ...rest } = props;
    return <textarea className={className} {...rest} />;
  }

  return <input className={className} {...props} />;
}

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
