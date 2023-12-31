import { ChangeEvent } from "react";
import { basicArea } from "../../constants";

interface BasicAreaProps {
  handleBasicAreaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectAllBasicArea: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedBasicArea: string[]
}

export default function BasicArea({ handleBasicAreaChange, handleSelectAllBasicArea, selectedBasicArea }: BasicAreaProps) {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:place-items-start md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
      {basicArea.map((basic) => (
        <label key={`${basic.name}`} className="flex items-center text-slate-700">
          <input
            onChange={handleBasicAreaChange}
            name={`${basic.name}`}
            checked={selectedBasicArea.includes(basic.name)}
            type="checkbox"
            className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
          />
          {basic.label}
        </label>
      ))}
      <label className="flex items-center text-slate-700">
        <input
          onChange={handleSelectAllBasicArea} 
          type="checkbox"
          className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
        />
        Todas las áreas básicas
      </label>
    </div>
  );
}
