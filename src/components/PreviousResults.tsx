import { Results } from "../../types";
import CustomButton from "./CustomButton";
import { ArrowRight } from "./icons/ArrowRight";
import LogoFR from "./icons/LogoFR";

interface ResultsProps {
  results: Results;
  onButtonClick: () => void;
}

const PreviousResults = ({ results, onButtonClick }: ResultsProps) => {
  const handleFinish = () => {
    onButtonClick();
  };

  return (
    <>
      <section className="container px-4 mx-auto mt-4">
        <LogoFR />
        <div className="flex justify-center items-center flex-col mt-6">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 mx-auto">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                  <table className="min-w-min divide-y divide-gray-200 md:table-fixed">
                    <thead className="bg-body-table sticky top-0">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-500 sticky top-0 z-10"
                        >
                          <div className="flex items-center justify-center gap-x-3 text-white">
                            <span>Nombre</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 sticky top-0 z-10"
                        >
                          <div className="flex items-center justify-center gap-x-2 text-white">
                            <span>Fecha</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 sticky top-0 z-10"
                        >
                          <div className="flex items-center justify-center gap-x-2 text-white">
                            <span>Respuestas correctas</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                      {results.questions.map((question, index) => (
                        <tr key={index}>
                          <td className="flex justify-center items-center px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 `}
                            >
                              Simulacro 1
                            </div>
                            
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            08/09/2023
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            20/30
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <CustomButton
            title="Regresar"
            handleClick={handleFinish}
            containerStyles="lex items-center px-5 py-2 text-sm text-gray-700 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold mb-6 py-2 px-4 rounded mt-4"
            icon={<ArrowRight />}
            iconPosition="after"
          />
        </div>
      </section>
    </>
  );
};
export default PreviousResults;
