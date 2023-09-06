import CustomButton from "./CustomButton";
import LogoFR from "./icons/LogoFR";

interface QuestionBankProps {
  onButtonClick: () => void;
  isDisable: false
}

export default function QuestionBank({ onButtonClick, isDisable }: QuestionBankProps) {
  return (
    <div className="flex justify-center items-center p-24 bg-bg-primary h-screen w-screen">
      <div className="p-4 bg-white rounded-lg h-full w-full">
        <div className="flex items-center">
          <LogoFR />
        </div>
        <div className="flex flex-col justify-center items-center mt-28">
          <h1 className="text-typogra text-2xl text-center font-bold mb-4 ml-2 max-w-lg">
            Te damos la bienvenida nuestro simulador de exámenes de admisión a
            la residencia
          </h1>
          <div className="flex mt-16">
            <CustomButton
              title="Crear simulacro"
              containerStyles="transition-colors duration-200 border rounded-md gap-x-2 hover:bg-btn-primary-hover bg-btn-primary text-white font-bold"
              btnType="button"
              handleClick={onButtonClick}
            />
            {
              isDisable && (
                <CustomButton
                  title="Simulación universidad"
                  containerStyles="transition-colors duration-200 border ml-20 rounded-md gap-x-2 hover:bg-btn-primary-hover bg-btn-primary text-white font-bold"
                  btnType="button"
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
