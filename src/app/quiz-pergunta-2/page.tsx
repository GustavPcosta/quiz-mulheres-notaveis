


"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Prox from "../../../public/proximo.svg";
import "./index.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AnswerOption {
  name: string;
  isCorrect: boolean;
}

export default function QuizPerguntaIncorreto() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Obtém os parâmetros da URL
  const contribution = searchParams.get("contribution") || "";
  const optionsParam = searchParams.get("options") || "[]";
  
  
  const currentQuestion = parseInt(searchParams.get("questionNumber") || "1");
  const totalQuestions = parseInt(searchParams.get("totalQuestions") || "5");
  const acertos = parseInt(searchParams.get("acertos") || "0");
  const erros = parseInt(searchParams.get("erros") || "0");

  
  const [options, setOptions] = useState<AnswerOption[]>([]);

  useEffect(() => {
    try {
      const parsedOptions = JSON.parse(decodeURIComponent(optionsParam));
      setOptions(parsedOptions);
    } catch (error) {
      console.error("Erro ao processar opções:", error);
      setOptions([]);
    }
  }, [optionsParam]);

  // Função para avançar para a próxima pergunta
  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      // This was the last question, go to conclusion
      router.push(`/quiz-concluido?acertos=${acertos}&erros=${erros}`);
    } else {
      // Return to quiz page for next question
      router.push(`/quiz-content?currentQuestion=${currentQuestion + 1}&acertos=${acertos}&erros=${erros}`);
    }
  };

  return (
    <div className="content-cards-quiz-pergunta-2">
      <Card className="body-card-quiz-pergunta-2 p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        <CardTitle className="card-title-quiz text-white font-bold text-[20px] text-center">
          {/* Pergunta {currentQuestion} de {totalQuestions} */}
        </CardTitle>
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Qual alternativa descreve essa informação?
        </CardTitle>

        <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
          {contribution}
        </CardDescription>

        <div className="content-button-card-quiz-pergunta">
          {options.length > 0 && (
            <>
              <div className="btn-button-quiz">
                <Button 
                  className={`button-card-quiz ${options[0]?.isCorrect ? "bg-[#c8f4d3]" : options[0]?.isCorrect === false ? "bg-[#FFA9A9]" : "bg-gray-400"}`}
                  disabled
                >
                  {options[0]?.name || ""}
                </Button>
                {options[1] && (
                  <div className="btn-content-2">
                    <Button 
                      className={`button-card-quiz ${options[1]?.isCorrect ? "bg-[#c8f4d3]" : options[1]?.isCorrect === false ? "bg-[#FFA9A9]" : "bg-gray-400"}`}
                      disabled
                    >
                      {options[1]?.name || ""}
                    </Button>
                  </div>
                )}
              </div>

              {options.length > 2 && (
                <div className="btn-button-quiz">
                  <Button 
                    className={`button-card-quiz ${options[2]?.isCorrect ? "bg-[#c8f4d3]" : options[2]?.isCorrect === false ? "bg-[#FFA9A9]" : "bg-gray-400"}`}
                    disabled
                  >
                    {options[2]?.name || ""}
                  </Button>
                  {options[3] && (
                    <div className="btn-content-2">
                      <Button 
                        className={`button-card-quiz ${options[3]?.isCorrect ? "bg-[#c8f4d3]" : options[3]?.isCorrect === false ? "bg-[#FFA9A9]" : "bg-gray-400"}`}
                        disabled
                      >
                        {options[3]?.name || ""}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="mt-4 text-white text-center mb-4">
          <span className="font-bold">Acertos:</span> {acertos} | <span className="font-bold">Erros:</span> {erros}
        </div>

        <div className="btn-button-finally">
          <Button className="btn-button-3-2">
            Incorreto!
          </Button>
          <Button 
            className="btn-button-4-2" 
            onClick={handleNextQuestion}
          >
            {currentQuestion >= totalQuestions ? "Ver resultado" : "Próxima pergunta"}
            <Image className="img-button" src={Prox} alt="próximo"/>
          </Button>
        </div>
      </Card>
    </div>
  );
}