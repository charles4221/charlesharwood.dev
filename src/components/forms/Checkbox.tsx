type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export function Checkbox({ id, name, label, defaultChecked }: CheckboxProps) {
  return (
    <label className="inline-flex items-center mt-2">
      <input
        type="checkbox"
        name={name}
        value={id}
        defaultChecked={defaultChecked}
        className="outline-sky-500 outline-2 outline-offset-2 focus:outline focus-visible:outline"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
}
