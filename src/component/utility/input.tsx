import { InputType } from "../dataType/types";

export default function Input({
  label,
  name,
  type,
  placeholder,
  classNameInput,
  classNameLabel,
  register,
}: InputType) {
  return (
    <div className="relative flex items-center rounded-[5px]">
      <label
        htmlFor={name}
        className={`search_label ${classNameLabel} capitalize`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full box-border autofill:bg-transparent outline-none ${classNameInput}`}
        {...register}
      />
    </div>
  );
}
