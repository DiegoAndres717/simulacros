import { ChangeEvent } from "react";
import { Specialties } from "../../types";

interface SpecialitiesProps {
  handleSpecialtyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectAllSpecialties: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedSpecialties: string[];
  specialties: Specialties | undefined;
}

export default function Specialties({
  handleSpecialtyChange,
  handleSelectAllSpecialties,
  selectedSpecialties,
  specialties,
}: SpecialitiesProps) {
  return (
    <>
      <label className="flex items-center text-slate-700 mb-4">
        <input
          onChange={handleSelectAllSpecialties}
          type="checkbox"
          className="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
        />
        Todas las Especialidades
      </label>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:place-items-start md:grid-cols-4 gap-2 mb-4">
        {specialties?.options &&
          Object.values(specialties.options).map((specialty) => (
            <label
              key={specialty.name}
              className="flex items-center text-slate-700 mb-2"
            >
              <input
                onChange={handleSpecialtyChange}
                checked={selectedSpecialties.includes(specialty.name)}
                name={specialty.name}
                type={specialties.type}
                className="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
              />
              {specialty.label}
            </label>
          ))}
      </div>
    </>
  );
}
