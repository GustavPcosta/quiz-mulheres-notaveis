import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./index.css";

export default function QuizConluido2() {
  return (
    <div className="content-cards-quiz-conclusao">
      <Card className="body-card-quiz-conclusao p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Quiz Concluído !
        </CardTitle>
        <CardTitle className="card-title-quiz text-white font-bold text-[45px] text-center">
         5/10
        </CardTitle>
        
        <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
        Infelizmente você acertou poucas perguntas!!
        </CardDescription>

        <Card className="card-conclusao">
            <CardDescription className="text-center leading-relaxed  text-[20px] text-white font-bold">
                Você sabia?
            </CardDescription>
            <div className="text-conclusao">
            <CardDescription className=" text-center  leading-relaxed  text-[20px] text-white font-medium">
            Muitas das mulheres apresentadas neste quiz enfrentaram enormes desafios e preconceitos em suas épocas, mas mesmo assim conseguiram deixar um legado duradouro que inspirou gerações.
            </CardDescription>
            </div>
           
        </Card>
       <div>
        <Button className="btn-button-5">
            Iniciar quiz
        </Button>
       </div>
      </Card>
    </div>
  );
}
