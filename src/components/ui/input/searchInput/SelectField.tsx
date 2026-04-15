"use client";


import Label from "../../switch/Label";
import Select from "../../switch/Select";
import { ChevronDownIcon } from "@/src/icons";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;

  // style overrides
  wrapperClassName?: string;
  selectClassName?: string;
  disabled?: boolean;
};

export default function SelectField({
  label,
  options,
  placeholder = "Select Option",
  value,
  onChange,
  wrapperClassName = "",
  selectClassName = "",
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className={wrapperClassName}>
      {label ? <Label>{label}</Label> : null}

      <div className="relative">
        <Select
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`dark:bg-[#0D0D12] dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-500 ${selectClassName}`}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
          <ChevronDownIcon className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
