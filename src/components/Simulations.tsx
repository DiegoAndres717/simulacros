import { ChangeEvent, useEffect, useState } from "react";
import BasicArea from "./BasicArea";
import Specialties from "./Specialties";
import { Toaster, toast } from "sonner";
import {
  handleChangeGeneral,
  handleSelectAll,
  handleStart,
  validateInput,
} from "../../utils";
import { DataSettings, FormErrors, SimulationsProps } from "../../types";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { basicArea, specialties } from "../../constants";
import LogoFR from "./icons/LogoFR";

export default function Simulations({
  selectedBasicArea,
  selectedSpecialties,
  timeQuestions,
  formErrors,
  setFormErrors,
  onButtonClick,
  setSelectedSpecialties,
  setSelectedBasicArea,
  handleTimeUnlimitedChange,
  handleTimeQuestionsChange,
}: SimulationsProps) {
  const [numQuestions, setNumQuestions] = useState(20);
  const [nameQuestions, setNameQuestions] = useState("");
  const [settings, setSettings] = useState<DataSettings | null>(null);

  useEffect(() => {
    fetch("./data/settings.json")
      .then((response) => response.json())
      .then((data) => setSettings(data));
  }, []);

  useEffect(() => {
    if (settings) {
      setNameQuestions(settings.nameSimulation.defaultValue);
    }
  }, [settings]);

  const handleBasicAreaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedBasicArea = handleChangeGeneral(
      event,
      selectedBasicArea,
      setSelectedBasicArea
    );
    const isValid = validateInput(newSelectedBasicArea.length, "number", {
      min: settings?.basicArea.minimum,
    });
    setFormErrors((prev) => ({ ...prev, checkBasicArea: !isValid }));
  };
  const handleSelectAllBasicArea = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event, basicArea, setSelectedBasicArea);
    setFormErrors((prev) => ({ ...prev, checkBasicArea: false }));
  };

  const handleSpecialtyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedSpecialties = handleChangeGeneral(
      event,
      selectedSpecialties,
      setSelectedSpecialties
    );
    const isValid = validateInput(newSelectedSpecialties.length, "number", {
      min: settings?.specialties.minimum,
    });
    setFormErrors((prev) => ({ ...prev, checkSpecialties: !isValid }));
  };

  const handleSelectAllSpecialties = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event, specialties, setSelectedSpecialties);
    setFormErrors((prev) => ({ ...prev, checkSpecialties: false }));
  };

  const handleNumQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setNumQuestions(value);
    const isValid = validateInput(value, "number", {
      min: settings?.numQuestions.minimum,
      max: settings?.numQuestions.maximum,
    });
    setFormErrors((prev) => ({ ...prev, numQuestions: !isValid }));
  };

  const handleNameQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameQuestions(value);
    const isValid = validateInput(value, "text");
    setFormErrors((prev) => ({ ...prev, nameQuestions: !isValid }));
  };

  const handleFormErrors = (errors: FormErrors) => {
    setFormErrors(errors);
  };

  const handleStartQuestions = () => {
    handleStart(
      selectedSpecialties,
      selectedBasicArea,
      numQuestions,
      timeQuestions,
      nameQuestions,
      toast,
      onButtonClick,
      handleFormErrors
    );
  };

  return (
    <>
      {settings && (
        <section className="p-10 bg-bg-primary min-h-screen flex items-center justify-center">
          <div className="px-8 pt-5 relative bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <LogoFR />
            </div>
            <Toaster richColors position="top-center" />
            <div className="absolute top-0 text-typogra right-2 p-4 font-semibold">
              Tienes 2 intentos
            </div>
            <h2 className="text-lg text-center text-typogra md:text-left font-bold mb-2">
              {settings?.specialties.title}
            </h2>
            {formErrors.checkSpecialties && (
              <p className="text-red-500">
                Debes seleccionar al menos 4 especialidades
              </p>
            )}
            <Specialties
              handleSpecialtyChange={handleSpecialtyChange}
              handleSelectAllSpecialties={handleSelectAllSpecialties}
              selectedSpecialties={selectedSpecialties}
              specialties={settings?.specialties}
            />
            <h2 className="text-lg font-bold mb-2 text-center md:text-left text-typogra">
              {settings?.basicArea.title}
            </h2>
            {/* {formErrors.checkBasicArea && (
              <p className="text-red-500">
                Debes seleccionar al menos 1 área básica
              </p>
            )} */}
            <BasicArea
              handleBasicAreaChange={handleBasicAreaChange}
              handleSelectAllBasicArea={handleSelectAllBasicArea}
              selectedBasicArea={selectedBasicArea}
              basicArea={settings?.basicArea}
            />
            <h2 className="text-lg font-bold mb-2 text-center md:text-left text-typogra">
              {settings?.generalCulture.title}
            </h2>
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
              <CustomInput
                inputType="checkbox"
                titleLabel="Añadir"
                inputStyle="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
                styleLabel="flex items-center text-slate-700"
                labelPosition="after"
              />
            </div>
            <div className="flex flex-col justify-start gap-x-28 sm:flex-row">
              <div className="mb-4">
                <CustomInput
                  titleLabel={settings.numQuestions.title}
                  styleLabel="text-lg font-bold mb-2 text-typogra"
                  inputType={settings.numQuestions.type}
                  handleChange={handleNumQuestionsChange}
                  value={numQuestions}
                  inputStyle={`border rounded p-1 w-full lg:max-w-xs ${
                    formErrors.numQuestions
                      ? "border-red-500 border-solid text-red-500"
                      : ""
                  }`}
                  min={settings.numQuestions.minimum}
                  max={100}
                />
              </div>
              <div className="mb-4 flex">
                <div className="flex flex-col">
                  <CustomInput
                    titleLabel={settings.timeMinutes.title}
                    styleLabel="text-lg font-bold mb-2 text-typogra"
                    inputType={settings.timeMinutes.type}
                    handleChange={handleTimeQuestionsChange}
                    value={timeQuestions}
                    inputStyle={`border rounded p-1 w-full lg:max-w-xs ${
                      formErrors.timeQuestions
                        ? "border-red-500 border-solid text-red-500"
                        : ""
                    }`}
                    min={settings.timeMinutes.minimum}
                  />
                  <p className="text-slate-700 text-xs">
                    Tiempo sugerido ({settings.timeMinutes.minimum} min)
                  </p>
                </div>
                <CustomInput
                  inputType="checkbox"
                  titleLabel="Ilimitado"
                  styleLabel="flex items-center font-semibold text-slate-700 ml-2 lg:ml-0 lg:mr-40 mt-9 sm:mt-9 md:mt-0"
                  inputStyle="mr-2 h-4 w-4 accent-check-color cursor-pointer"
                  labelPosition="after"
                  handleChange={handleTimeUnlimitedChange}
                />
              </div>
            </div>
            <div className="flex flex-col max-w-sm">
              {formErrors.nameQuestions && (
                <p className="text-red-500">
                  Debes ingresar un nombre para el simulacro
                </p>
              )}
              <CustomInput
                titleLabel={settings.nameSimulation.title}
                styleLabel="text-lg font-bold mb-2 text-typogra"
                inputType={settings.nameSimulation.type}
                handleChange={handleNameQuestionsChange}
                value={nameQuestions}
                inputStyle="border rounded p-1 w-full lg:max-w-xs"
              />
            </div>
            <div className="flex justify-center mt-4">
              <CustomButton
                title="Crear simulacro"
                handleClick={handleStartQuestions}
                containerStyles="bg-btn-primary hover:bg-btn-primary-hover text-white font-bold mb-6 py-2 px-4 rounded mt-4"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
