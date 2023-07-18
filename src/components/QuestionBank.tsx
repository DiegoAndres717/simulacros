import CustomButton from "./CustomButton"

interface QuestionBankProps {
  onButtonClick: () => void
}

export default function QuestionBank({ onButtonClick }:QuestionBankProps) {
  return (
    <div className="p-4">
      <h1 className="text-gray-700 text-2xl font-bold mb-4 text-center">Banco de preguntas</h1>
      <img className="w-full mb-4 h-60 p-0" src="https://dummyimage.com/1200x500" alt="Banner" />
      <div className="grid grid-cols-1 gap-4 mt-16 md:grid-cols-2 place-items-center">
        <div className="flex flex-col justify-center items-center p-4 border rounded w-2/3">
          <p className="mb-2 text-xl text-gray-700 font-semibold">Crea tu simulacro</p>
          <p className="mb-2 text-gray-500 font-medium">Inf de que es esto</p>
          <CustomButton 
            title="Iniciar"
            containerStyles="flex items-center px-5 py-2 text-sm font-bold text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            btnType="button"
            handleClick={onButtonClick}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-4 border rounded w-2/3">
          <p className="mb-2 text-xl text-gray-700 font-semibold">Simulacro universidades</p>
          <CustomButton 
            title="Iniciar"
            containerStyles="flex items-center px-5 py-2 text-sm font-bold text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            btnType="button"
          />
        </div> 
      </div>
    </div>
  )
}
