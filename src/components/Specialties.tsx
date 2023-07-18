import { ChangeEvent } from "react";
import { specialties } from "../../constants";

interface SpecialitiesProps {
  handleSpecialtyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectAllSpecialties: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedSpecialties: string[];
}

export default function Specialties({
  handleSpecialtyChange,
  handleSelectAllSpecialties,
  selectedSpecialties,
}: SpecialitiesProps) {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:place-items-start md:grid-cols-4  gap-2 mb-4">
      {specialties.map((specialty) => (
        <label
          key={specialty.name}
          className="flex items-center text-slate-700"
        >
          <input
            onChange={handleSpecialtyChange}
            checked={selectedSpecialties.includes(specialty.name)}
            name={specialty.name}
            type="checkbox"
            className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
          />
          {specialty.label}
        </label>
      ))}
      <label className="flex items-center text-slate-700">
        <input
          onChange={handleSelectAllSpecialties}
          type="checkbox"
          className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
        />
        Todas las Especialidades
      </label>
    </div>
  );
}
