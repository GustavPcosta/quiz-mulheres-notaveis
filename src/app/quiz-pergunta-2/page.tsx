


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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [contribution, setContribution] = useState("");
  const [options, setOptions] = useState<AnswerOption[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  useEffect(() => {
    if (searchParams) {
      setContribution(searchParams.get("contribution") || "");
      setCurrentQuestion(parseInt(searchParams.get("questionNumber") || "1"));
      setTotalQuestions(parseInt(searchParams.get("totalQuestions") || "5"));
      setAcertos(parseInt(searchParams.get("acertos") || "0"));
      setErros(parseInt(searchParams.get("erros") || "0"));

      const optionsParam = searchParams.get("options") || "[]";
      try {
        setOptions(JSON.parse(decodeURIComponent(optionsParam)));
      } catch (error) {
        console.error("Erro ao processar opções:", error);
        setOptions([]);
      }
    }
  }, [searchParams]);

  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      router.push(`/quiz-concluido?acertos=${acertos}&erros=${erros}`);
    } else {
      router.push(`/quiz-content?currentQuestion=${currentQuestion + 1}&acertos=${acertos}&erros=${erros}`);
    }
  };

  return (
    <div className="content-cards-quiz-pergunta-2">
      <Card className="body-card-quiz-pergunta-2 p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Qual alternativa descreve essa informação?
        </CardTitle>
        <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
          {contribution}
        </CardDescription>

        <div className="content-button-card-quiz-pergunta">
          {options.map((option, index) => (
            <div key={index} className="btn-button-quiz">
              <Button 
                className={`button-card-quiz ${option.isCorrect ? "bg-[#c8f4d3]" : "bg-[#FFA9A9]"}`}
                disabled
              >
                {option.name}
              </Button>
            </div>
          ))}
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
