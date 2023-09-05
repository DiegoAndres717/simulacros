import { Results } from "../../types";
import CustomButton from "./CustomButton";
import { ArrowRight } from "./icons/ArrowRight";

interface ResultsProps {
  results: Results,
  onButtonClick: () => void;
}

const Results = ({
  results,
  onButtonClick
}: ResultsProps) => {
  const handleFinish = () => {
    //resetear los sessionStorage
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("timeQuestions");
    sessionStorage.removeItem("timeRemaining");
    sessionStorage.removeItem("questions");

    onButtonClick();
  }

  return (
    <>
      <section className="container px-4 mx-auto mt-4">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800">Respuestas</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
            {results.total}
          </span>
        </div>
        <p className="text-gray-700">
          Porcentaje de respuestas correctas: {results.score.toFixed(2).replace('.00','')}%
        </p>
        <p className="text-gray-700">
          Respuestas correctas: {results.correct} de {results.total}
        </p>

        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center justify-center gap-x-3">
                          <span>Pregunta</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center justify-center gap-x-2">
                          <span>Respuesta</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center justify-center gap-x-2">
                          <span>Tema de pregunta</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center justify-center gap-x-2">
                          <span>Segundos usados</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-center">
                    {results.questions.map((question, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <p className="text-sm font-normal text-gray-600">
                            {index + 1}
                          </p>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${question.is_correct ?"bg-emerald-100/60":"bg-red-100/60"}`}>
                            {question.is_correct ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                            )}
                            {question.is_correct ? (
                              <span className="text-sm font-normal text-emerald-500">
                                correcta
                              </span>
                            ) : (
                              <span className="text-sm font-normal text-red-500">
                                incorrecta
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {question.specialty}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {/* {questionTimes[index]} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6">
          <CustomButton 
            title="Finalizar"
            handleClick={handleFinish}
            containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            icon={<ArrowRight />}
            iconPosition="after"
          />
        </div>
      </section>
    </>
  );
};
export default Results;
