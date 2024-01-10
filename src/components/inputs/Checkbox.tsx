import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export function Checkbox({
  label,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string }) {
  return (
    <label htmlFor={props.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
        {...props}
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
