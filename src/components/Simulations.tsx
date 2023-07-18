import { ChangeEvent, useState } from "react";
import BasicArea from "./BasicArea";
import Specialties from "./Specialties";
import { Toaster, toast } from "sonner";
import { handleChangeGeneral, handleSelectAll, handleStart } from "../../utils";
import { SimulationsProps } from "../../types";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { basicArea, specialties } from "../../constants";

export default function Simulations({
  selectedBasicArea,
  selectedSpecialties,
  timeQuestions,
  onButtonClick,
  setSelectedSpecialties,
  setSelectedBasicArea,
  handleTimeQuestionsChange,
}: SimulationsProps) {
  const [numQuestions, setNumQuestions] = useState(20);
  const [nameQuestions, setNameQuestions] = useState("");

  const handleBasicAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeGeneral(event, setSelectedBasicArea);
  };
  const handleSelectAllBasicArea = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event, basicArea, setSelectedBasicArea);
  };

  const handleSpecialtyChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeGeneral(event, setSelectedSpecialties);
  };

  const handleSelectAllSpecialties = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event, specialties, setSelectedSpecialties);
  };

  const handleNumQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumQuestions(Number(event.target.value));
  };

  const handleNameQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameQuestions(event.target.value);
  };

  const handleStartQuestions = () => {
    handleStart(
      selectedSpecialties,
      selectedBasicArea,
      numQuestions,
      timeQuestions,
      nameQuestions,
      toast,
      onButtonClick
    );
  };

  return (
    <div className="p-10 relative">
      <Toaster richColors position="top-center" />
      <div className="absolute top-0 text-gray-700 right-2 p-4 font-semibold">
        Tienes 2 intentos
      </div>
      <h2 className="text-lg text-center text-gray-700 md:text-left font-bold mb-2">
        Elige las especialidades (mínimo 4)
      </h2>
      <Specialties
        handleSpecialtyChange={handleSpecialtyChange}
        handleSelectAllSpecialties={handleSelectAllSpecialties}
        selectedSpecialties={selectedSpecialties}
      />
      <h2 className="text-lg font-bold mb-2 text-center md:text-left text-gray-700">
        Elige las áreas básicas
      </h2>
      <BasicArea
        handleBasicAreaChange={handleBasicAreaChange}
        handleSelectAllBasicArea={handleSelectAllBasicArea}
        selectedBasicArea={selectedBasicArea}
      />
      <h2 className="text-lg font-bold mb-2 text-center md:text-left text-gray-700">
        Cultura general
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
        <CustomInput
          inputType="checkbox"
          titleLabel="Añadir"
          inputStyle="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
          styleLabel="flex items-center text-slate-700"
          labelPosition="after"
        />
      </div>
      <div className="flex flex-col justify-start gap-x-28 sm:flex-row">
        <div className="mb-4">
          <CustomInput
            titleLabel="Elige el número de preguntas (mínimo 20, máximo 100)"
            styleLabel="text-lg font-bold mb-2 text-gray-700"
            inputType="number"
            handleChange={handleNumQuestionsChange}
            value={numQuestions}
            inputStyle="border rounded p-1 w-full lg:max-w-xs"
            min="20"
            max="100"
          />
        </div>
        <div className="mb-4">
          <CustomInput
            titleLabel="Elige el tiempo (minutos)"
            styleLabel="text-lg font-bold mb-2 text-gray-700"
            inputType="number"
            handleChange={handleTimeQuestionsChange}
            value={timeQuestions}
            inputStyle="border rounded p-1 w-full lg:max-w-xs"
          />
        </div>
      </div>
      <div className="flex flex-col max-w-sm">
        <CustomInput
          titleLabel="Nombra tu simulacro"
          styleLabel="text-lg font-bold mb-2 text-gray-700"
          inputType="text"
          handleChange={handleNameQuestionsChange}
          value={nameQuestions}
          inputStyle="border rounded p-1 w-full"
        />
      </div>
      <CustomButton
        title="Iniciar"
        handleClick={handleStartQuestions}
        containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 font-bold capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
      />
    </div>
  );
}
