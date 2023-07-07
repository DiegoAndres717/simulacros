import BasicArea from "./BasicArea";
import Specialties from "./Specialties";

interface SimulationsProps {
  onButtonClick: () => void;
}

export default function Simulations({onButtonClick}: SimulationsProps) {
  
  return (
    <div className="p-4 relative">
      <div className="absolute top-0 right-2 p-4 font-semibold">Te quedan 2 intentos</div>
      <h2 className="text-lg font-bold mb-2">
        Elige las especialidades (mínimo 4)
      </h2>
      <Specialties />
      <h2 className="text-lg font-bold mb-2">Elige las áreas básicas</h2>
      <BasicArea />
      <h2 className="text-lg font-bold mb-2">Cultura general</h2>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer" />
          Añadir
        </label>
      </div>

      <div className="flex justify-start gap-x-28">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">
            Elige el número de preguntas (mínimo 20, máximo 100)
          </h2>
          <input
            type="number"
            min="20"
            max="100"
            className="border rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Elige el tiempo (minutos)</h2>
          <input type="number" className="border rounded p-1 w-full" />
        </div>
      </div>
      <div className="flex flex-col max-w-sm">
      <h2 className="text-lg font-bold mb-4">Nombra tu simulacro</h2>
      <div className="mb-4">
        <input type="text" className="border rounded p-1 w-full" />
      </div>
      </div>

      <button 
        onClick={onButtonClick}
        className="flex items-center px-5 py-2 text-sm text-gray-700 font-bold capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
        Iniciar
      </button>
    </div>
  );
}
