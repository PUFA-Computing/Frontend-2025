"use client";
import React from "react";
import Select from "react-select";

interface SelectsProps {
   defaults: string[];
   options: { value: string; label: string }[];
   label: string;
   htmlFor: string;
}

const Selects: React.FC<SelectsProps> = ({
   defaults,
   options,
   label,
   htmlFor,
}) => {
   const selectProps = {
      isClearable: true,
      isSearchable: true,
   };

   const defaultValues = options.filter((option) =>
      defaults.includes(option.value)
   );

   return (
      <div>
         <label className="mb-1 block text-sm font-medium" htmlFor={htmlFor}>
            {label}
         </label>
         <Select
            className="w-full rounded-md"
            classNamePrefix="select"
            value={defaultValues}
            {...selectProps}
            name="color"
            options={options}
         />
      </div>
   );
};

export default Selects;
