import { ChangeEvent } from "react";
import { BasicArea } from "../../types";

interface BasicAreaProps {
  handleBasicAreaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectAllBasicArea: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedBasicArea: string[];
  basicArea: BasicArea | undefined;
}

export default function BasicArea({
  handleBasicAreaChange,
  handleSelectAllBasicArea,
  selectedBasicArea,
  basicArea,
}: BasicAreaProps) {
  return (
    <>
      <label className="flex items-center text-slate-700 mb-4">
        <input
          onChange={handleSelectAllBasicArea}
          type="checkbox"
          className="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
        />
        Todas las áreas básicas
      </label>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:place-items-start md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
        {basicArea?.options &&
          Object.values(basicArea.options).map((basic) => (
            <label
              key={`${basic.name}`}
              className="flex items-center text-slate-700 mb-2"
            >
              <input
                onChange={handleBasicAreaChange}
                name={`${basic.name}`}
                checked={selectedBasicArea.includes(basic.name)}
                type={basicArea.type}
                className="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
              />
              {basic.label}
            </label>
          ))}
      </div>
    </>
  );
}
