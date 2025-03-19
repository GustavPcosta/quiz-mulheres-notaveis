// "use client"

// import { Card, CardDescription, CardTitle } from "@/components/ui/card";
// import Logo from "../../../public/Logo.svg";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import "./index.css";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function QuizConcluido() {
//   const searchParams = useSearchParams();
//   const acertos = parseInt(searchParams.get('acertos') ?? '0', 10);
//   const erros = parseInt(searchParams.get('erros') ?? '0', 10);

//   return (
//     <div className="content-cards-quiz-conclusao">
//       <Card className="body-card-quiz-conclusao p-6">
//         <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
//         <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
//           Quiz Concluído!
//         </CardTitle>

//         {/* Exibição da quantidade de acertos e erros */}
//         <div className="flex justify-center gap-10 my-4">
//           <div className="text-center">
//             <CardTitle className="text-green-400 text-[45px] font-bold">{acertos}</CardTitle>
//             <CardDescription className="text-white text-[18px]">Acertos</CardDescription>
//           </div>
//           <div className="text-center">
//             <CardTitle className="text-red-400 text-[45px] font-bold">{erros}</CardTitle>
//             <CardDescription className="text-white text-[18px]">Erros</CardDescription>
//           </div>
//         </div>

//         <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
//           {acertos >= 4
//             ? "Parabéns! Você demonstrou um ótimo conhecimento sobre mulheres notáveis."
//             : "Bom trabalho! Você tem um conhecimento razoável sobre mulheres notáveis."}
//         </CardDescription>

//         <Card className="card-conclusao">
//           <CardDescription className="text-center leading-relaxed text-[20px] text-white font-bold">
//             Você sabia?
//           </CardDescription>
//           <div className="text-conclusao">
//             <CardDescription className="text-center leading-relaxed text-[20px] text-white font-medium">
//               Muitas das mulheres apresentadas neste quiz enfrentaram enormes desafios e preconceitos em suas épocas, mas mesmo assim conseguiram deixar um legado duradouro que inspirou gerações.
//             </CardDescription>
//           </div>
//         </Card>

//         <div>
//           <Link href={"/quiz-content"}>
//             <Button className="btn-button-5">Iniciar novo quiz</Button>
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }







"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./index.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuizConcluido() {
  const searchParams = useSearchParams();
  const acertos = parseInt(searchParams.get('acertos') ?? '0', 10);
  const erros = parseInt(searchParams.get('erros') ?? '0', 10);
  const totalQuestions = acertos + erros;

  return (
    <div className="content-cards-quiz-conclusao">
      <Card className="body-card-quiz-conclusao p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Quiz Concluído!
        </CardTitle>
        
        {/* Exibição da quantidade de acertos e erros */}
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
        
        {/* Performance message based on scores */}
        <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
          {acertos >= 4
            ? "Parabéns! Você demonstrou um ótimo conhecimento sobre mulheres notáveis."
            : acertos >= 3
            ? "Bom trabalho! Você tem um conhecimento razoável sobre mulheres notáveis."
            : "Continue aprendendo! Este quiz ajudará você a conhecer mais sobre mulheres notáveis na história."}
        </CardDescription>
        
        <Card className="card-conclusao mt-4">
          <CardDescription className="text-center leading-relaxed text-[20px] text-white font-bold">
            Você sabia?
          </CardDescription>
          <div className="text-conclusao">
            <CardDescription className="text-center leading-relaxed text-[20px] text-white font-medium">
              Muitas das mulheres apresentadas neste quiz enfrentaram enormes desafios e preconceitos em suas épocas, mas mesmo assim conseguiram deixar um legado duradouro que inspirou gerações.
            </CardDescription>
          </div>
        </Card>
        
        {/* Score summary */}
        <div className="mt-4 bg-white/10 p-4 rounded-lg">
          <CardDescription className="text-center text-white text-[16px]">
            Você respondeu {totalQuestions} perguntas, com {acertos} respostas corretas ({Math.round((acertos/totalQuestions)*100)}%)
          </CardDescription>
        </div>
        
        <div className="mt-6">
          <Link href={"/quiz-content"}>
            <Button className="btn-button-5">Iniciar novo quiz</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}