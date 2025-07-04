import type { JSX } from 'react';
type InputProps = JSX.IntrinsicElements['input'];
type TextAreaProps = JSX.IntrinsicElements['textarea'] & { isTextArea: true };

function isTextAreaProps(
  props: InputProps | TextAreaProps,
): props is TextAreaProps {
  return 'isTextArea' in props && props.isTextArea;
}

const inputClassName =
  'block w-full rounded-sm p-3 mb-2 bg-slate-100 text-slate-950';

export function Input(props: InputProps | TextAreaProps) {
  if (isTextAreaProps(props)) {
    const { isTextArea, ...rest } = props;
    return <textarea className={inputClassName} {...rest} />;
  }

  return <input className={inputClassName} {...props} />;
}
