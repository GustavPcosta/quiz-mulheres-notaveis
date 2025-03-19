"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./index.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizConcluido() {
  const searchParams = useSearchParams();
  const [acertos, setAcertos] = useState<number | null>(null);
  const [erros, setErros] = useState<number | null>(null);

  useEffect(() => {
    // Evita acessar useSearchParams no build
    setAcertos(parseInt(searchParams.get('acertos') ?? '0', 10));
    setErros(parseInt(searchParams.get('erros') ?? '0', 10));
  }, [searchParams]);

  // Evita renderizar enquanto os valores não estão carregados
  if (acertos === null || erros === null) return null;

  return (
    <div className="content-cards-quiz-conclusao">
      <Card className="body-card-quiz-conclusao p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Quiz Concluído!
        </CardTitle>

        <div className="flex justify-center gap-10 my-4">
          <div className="text-center">
            <CardTitle className="text-green-400 text-[45px] font-bold">{acertos}</CardTitle>
            <CardDescription className="text-white text-[18px]">Acertos</CardDescription>
          </div>
          <div className="text-center">
            <CardTitle className="text-red-400 text-[45px] font-bold">{erros}</CardTitle>
            <CardDescription className="text-white text-[18px]">Erros</CardDescription>
          </div>
        </div>

        <CardDescription className="text-white font-light text-[20px] text-center">
          {acertos >= 4 ? "Parabéns! Você se saiu muito bem!" : "Bom trabalho! Continue aprendendo."}
        </CardDescription>

        <Link href={"/quiz-content"}>
          <Button className="btn-button-5">Tentar novamente</Button>
        </Link>
      </Card>
    </div>
  );
}
