// "use client"

// import { Card, CardDescription, CardTitle } from "@/components/ui/card";
// import Logo from "../../../public/Logo.svg";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import "./index.css";
// import api from "@/Api/api";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// // Define TypeScript interfaces
// interface Woman {
//   id: number;
//   nome: string;
//   contribuicao: string;
//   ano_nascimento: number | null;
//   ano_morte: number | null;
// }

// interface AnswerOption {
//   name: string;
//   isCorrect: boolean;
// }

// export default function Quiz() {
//   const [women, setWomen] = useState<Woman[]>([]);
//   const [currentWoman, setCurrentWoman] = useState<Woman | null>(null);
//   const [options, setOptions] = useState<AnswerOption[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const [acertos, setAcertos] = useState(0)
//   const [erros, setErros] = useState(0)
  

//   async function LoadWomen() {
//     try {
//       console.log("Fetching women data...");
//       const response = await api.get('/women');
//       console.log("API response:", response);
      
     
//       const womenData = response.data?.data || response.data;
      
     
//       if (Array.isArray(womenData) && womenData.length > 0) {
//         console.log("Women data loaded successfully:", womenData);
//         setWomen(womenData);
//         setIsLoading(false);
//       } else {
//         console.error("API response format incorrect:", response);
        
        
//         const fallbackData = [
//           {
//             id: 1,
//             nome: "Cleópatra",
//             contribuicao: "Última rainha da dinastia ptolomaica do Egito, desempenhou um papel crucial na política do Mediterrâneo.",
//             ano_nascimento: null,
//             ano_morte: null
//           },
//           {
//             id: 2,
//             nome: "Marie Curie",
//             contribuicao: "Física e química pioneira no campo da radioatividade, primeira mulher a ganhar um Prêmio Nobel.",
//             ano_nascimento: 1867,
//             ano_morte: 1934
//           },
//           {
//             id: 3,
//             nome: "Ada Lovelace",
//             contribuicao: "Matemática e escritora inglesa, conhecida principalmente por seu trabalho na máquina analítica de Charles Babbage.",
//             ano_nascimento: 1815,
//             ano_morte: 1852
//           },
//           {
//             id: 4,
//             nome: "Grace Hopper",
//             contribuicao: "Pioneira da computação, foi uma das primeiras programadoras do computador Harvard Mark I, desenvolveu o primeiro compilador para linguagens de programação.",
//             ano_nascimento: 1906,
//             ano_morte: 1992
//           }
//         ];
        
//         console.log("Using fallback data for testing");
//         setWomen(fallbackData);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//       setError("Failed to load data. Check console for details.");
//       setIsLoading(false);
//     }
//   }

 
//   const generateQuizQuestion = () => {
//     console.log("Generating quiz question. Women data length:", women.length);
//     if (women.length === 0) {
//       setError("No women data available");
//       return;
//     }

//     try {
      
//       const randomIndex = Math.floor(Math.random() * women.length);
//       const selected = women[randomIndex];
//       console.log("Selected woman:", selected);
//       setCurrentWoman(selected);

     
//       const availableIncorrect = women.filter(woman => woman.id !== selected.id);
//       const incorrectCount = Math.min(3, availableIncorrect.length);
      
//       const incorrectOptions = availableIncorrect
//         .sort(() => 0.5 - Math.random()) 
//         .slice(0, incorrectCount) 
//         .map(woman => ({ 
//           name: woman.nome, 
//           isCorrect: false 
//         }));
      
//       console.log("Incorrect options:", incorrectOptions);
      
    
//       const allOptions = [
//         { name: selected.nome, isCorrect: true },
//         ...incorrectOptions
//       ];
      
     
//       const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());
//       console.log("All shuffled options:", shuffledOptions);
//       setOptions(shuffledOptions);
      
//       // Clear any previous errors
//       setError(null);
//     } catch (err) {
//       console.error("Error generating quiz:", err);
//       setError("Failed to generate quiz question");
//     }
//   };

//   // Load women data on component mount
//   useEffect(() => {
//     LoadWomen();
//   }, []);

//   // Generate quiz question when women data is loaded
//   useEffect(() => {
//     if (women.length > 0) {
//       console.log("Women data loaded, generating quiz question");
//       generateQuizQuestion();
//     }
//   }, [women]);

//   const handleAnswer = (isCorrect: boolean, selectedName: string) => {
//     if (isCorrect) {
//     setAcertos(acertos +1)


//       if (!currentWoman) {
//         console.error("Cannot navigate: currentWoman is null");
//         return;
//       }
      
     
//       router.push(`/quiz-pergunta?` + 
//         `contribution=${encodeURIComponent(currentWoman.contribuicao)}` +
//         `&correctAnswer=${encodeURIComponent(selectedName)}` +
//         `&options=${encodeURIComponent(JSON.stringify(options))}`
//       );
//     } else {
//       setErros(erros +1)
//       if (!currentWoman) {
//         console.error("Cannot navigate: currentWoman is null");
//         return;
//       }
//       // router.push(`/quiz-concluido?acertos=${acertos}&erros=${erros}`);
    
//       router.push(`/quiz-pergunta-2?` + 
//         `contribution=${encodeURIComponent(currentWoman.contribuicao)}` +
//         `&correctAnswer=${encodeURIComponent(selectedName)}` +
//         `&options=${encodeURIComponent(JSON.stringify(options))}`
//       );
      
     
//     }
//     generateQuizQuestion();
//   };
//   // Display loading state
//   if (isLoading) {
//     return <div className="content-cards-quiz">Carregando...</div>;
//   }


  
//   // Display error state
//   if (error) {
//     return (
//       <div className="content-cards-quiz">
//         <div>Erro: {error}</div>
//         <Button 
//           className="mt-4 bg-[#E1C8F4]" 
//           onClick={() => LoadWomen()}
//         >
//           Tentar Novamente
//         </Button>
//       </div>
//     );
//   }

//   // Display quiz if no current woman (should not happen, but just in case)
//   if (!currentWoman) {
//     return (
//       <div className="content-cards-quiz">
//         <div>Nenhuma questão disponível</div>
//         <Button 
//           className="mt-4 bg-[#E1C8F4]" 
//           onClick={generateQuizQuestion}
//         >
//           Gerar Questão
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="content-cards-quiz">
//       <Card className="body-card-quiz p-6">
//         <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        
//         <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
//           Qual alternativa descreve essa informação?
//         </CardTitle>
        
//         <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
//           {currentWoman.contribuicao}
//         </CardDescription>
        
//         <div className="content-button-card-quiz">
//           {options.map((option, index) => {
//             // Place buttons in appropriate containers
//             if (index === 0) {
//               return (
//                 <div key={index} className="btn-button-quiz">
//                   <Button 
//                     className="button-card-quiz bg-[#E1C8F4]"
//                     onClick={() => handleAnswer(option.isCorrect,  option.name)}
//                   >
//                     {option.name}
//                   </Button>
//                   {options[1] && (
//                     <div className="btn-content-2">
//                       <Button 
//                         className="button-card-quiz bg-[#E1C8F4]"
//                         onClick={() => handleAnswer(options[1].isCorrect,  options[1].name)}
//                       >
//                         {options[1].name}
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               );
//             } else if (index === 2) {
//               return (
//                 <div key={index} className="btn-button-quiz">
//                   <Button 
//                     className="button-card-quiz bg-[#E1C8F4]"
//                     onClick={() => handleAnswer(option.isCorrect, option.name)}
//                   >
//                     {option.name}
//                   </Button>
//                   {options[3] && (
//                     <div className="btn-content-2">
//                       <Button 
//                         className="button-card-quiz bg-[#E1C8F4]"
//                         onClick={() => handleAnswer(options[3].isCorrect,  options[3].name)}
//                       >
//                         {options[3].name}
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               );
//             }
//             return null;
//           })}
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
import api from "@/Api/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Define TypeScript interfaces
interface Woman {
  id: number;
  nome: string;
  contribuicao: string;
  ano_nascimento: number | null;
  ano_morte: number | null;
}

interface AnswerOption {
  name: string;
  isCorrect: boolean;
}

export default function Quiz() {
  const [women, setWomen] = useState<Woman[]>([]);
  const [currentWoman, setCurrentWoman] = useState<Woman | null>(null);
  const [options, setOptions] = useState<AnswerOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  // Add counter for questions
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5; // Total number of questions in the quiz

  async function LoadWomen() {
    try {
      console.log("Fetching women data...");
      const response = await api.get('/women');
      console.log("API response:", response);
      
      const womenData = response.data?.data || response.data;
      
      if (Array.isArray(womenData) && womenData.length > 0) {
        console.log("Women data loaded successfully:", womenData);
        setWomen(womenData);
        setIsLoading(false);
      } else {
        console.error("API response format incorrect:", response);
        
        const fallbackData = [
          {
            id: 1,
            nome: "Cleópatra",
            contribuicao: "Última rainha da dinastia ptolomaica do Egito, desempenhou um papel crucial na política do Mediterrâneo.",
            ano_nascimento: null,
            ano_morte: null
          },
          {
            id: 2,
            nome: "Marie Curie",
            contribuicao: "Física e química pioneira no campo da radioatividade, primeira mulher a ganhar um Prêmio Nobel.",
            ano_nascimento: 1867,
            ano_morte: 1934
          },
          {
            id: 3,
            nome: "Ada Lovelace",
            contribuicao: "Matemática e escritora inglesa, conhecida principalmente por seu trabalho na máquina analítica de Charles Babbage.",
            ano_nascimento: 1815,
            ano_morte: 1852
          },
          {
            id: 4,
            nome: "Grace Hopper",
            contribuicao: "Pioneira da computação, foi uma das primeiras programadoras do computador Harvard Mark I, desenvolveu o primeiro compilador para linguagens de programação.",
            ano_nascimento: 1906,
            ano_morte: 1992
          }
        ];
        
        console.log("Using fallback data for testing");
        setWomen(fallbackData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("API error:", error);
      setError("Failed to load data. Check console for details.");
      setIsLoading(false);
    }
  }

  const generateQuizQuestion = () => {
    console.log("Generating quiz question. Women data length:", women.length);
    if (women.length === 0) {
      setError("No women data available");
      return;
    }

    try {
      const randomIndex = Math.floor(Math.random() * women.length);
      const selected = women[randomIndex];
      console.log("Selected woman:", selected);
      setCurrentWoman(selected);

      const availableIncorrect = women.filter(woman => woman.id !== selected.id);
      const incorrectCount = Math.min(3, availableIncorrect.length);
      
      const incorrectOptions = availableIncorrect
        .sort(() => 0.5 - Math.random()) 
        .slice(0, incorrectCount) 
        .map(woman => ({ 
          name: woman.nome, 
          isCorrect: false 
        }));
      
      console.log("Incorrect options:", incorrectOptions);
      
      const allOptions = [
        { name: selected.nome, isCorrect: true },
        ...incorrectOptions
      ];
      
      const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());
      console.log("All shuffled options:", shuffledOptions);
      setOptions(shuffledOptions);
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz question");
    }
  };

  // Load women data on component mount
  useEffect(() => {
    LoadWomen();
    // Reset quiz state on initial load
    setCurrentQuestion(1);
    setAcertos(0);
    setErros(0);
  }, []);

  // Generate quiz question when women data is loaded
  useEffect(() => {
    if (women.length > 0) {
      console.log("Women data loaded, generating quiz question");
      generateQuizQuestion();
    }
  }, [women]);

  const handleAnswer = (isCorrect: boolean, selectedName: string) => {
    if (isCorrect) {
      const newAcertos = acertos + 1;
      setAcertos(newAcertos);

      if (!currentWoman) {
        console.error("Cannot navigate: currentWoman is null");
        return;
      }
      
      router.push(`/quiz-pergunta?` + 
        `contribution=${encodeURIComponent(currentWoman.contribuicao)}` +
        `&correctAnswer=${encodeURIComponent(selectedName)}` +
        `&options=${encodeURIComponent(JSON.stringify(options))}` +
        `&questionNumber=${currentQuestion}` +
        `&totalQuestions=${totalQuestions}` +
        `&acertos=${newAcertos}` +
        `&erros=${erros}`
      );
    } else {
      const newErros = erros + 1;
      setErros(newErros);
      
      if (!currentWoman) {
        console.error("Cannot navigate: currentWoman is null");
        return;
      }
    
      router.push(`/quiz-pergunta-2?` + 
        `contribution=${encodeURIComponent(currentWoman.contribuicao)}` +
        `&correctAnswer=${encodeURIComponent(selectedName)}` +
        `&options=${encodeURIComponent(JSON.stringify(options))}` +
        `&questionNumber=${currentQuestion}` +
        `&totalQuestions=${totalQuestions}` +
        `&acertos=${acertos}` +
        `&erros=${newErros}`
      );
    }
    
    // Increment question counter
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    
    // Check if this was the last question
    if (nextQuestion > totalQuestions) {
      // Quiz is complete, navigate to conclusion page
      setTimeout(() => {
        router.push(`/quiz-concluido?acertos=${isCorrect ? acertos + 1 : acertos}&erros=${isCorrect ? erros : erros + 1}`);
      }, 2000); // Give time for the user to see the result
    } else {
      // Generate next question
      generateQuizQuestion();
    }
  };

  // Display loading state
  if (isLoading) {
    return <div className="content-cards-quiz">Carregando...</div>;
  }
  
  // Display error state
  if (error) {
    return (
      <div className="content-cards-quiz">
        <div>Erro: {error}</div>
        <Button 
          className="mt-4 bg-[#E1C8F4]" 
          onClick={() => LoadWomen()}
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  // Display quiz if no current woman (should not happen, but just in case)
  if (!currentWoman) {
    return (
      <div className="content-cards-quiz">
        <div>Nenhuma questão disponível</div>
        <Button 
          className="mt-4 bg-[#E1C8F4]" 
          onClick={generateQuizQuestion}
        >
          Gerar Questão
        </Button>
      </div>
    );
  }

  return (
    <div className="content-cards-quiz">
      <Card className="body-card-quiz p-6">
        <Image src={Logo} alt="Logo" className="mx-auto mb-4" />
        
        <CardTitle className="card-title-quiz text-white font-bold text-[20px] text-center">
          Pergunta {currentQuestion} de {totalQuestions}
        </CardTitle>
        
        <CardTitle className="card-title-quiz text-white font-bold text-[25px] text-center">
          Qual alternativa descreve essa informação?
        </CardTitle>
        
        <CardDescription className="text-white font-light text-[20px] px-10 text-center leading-relaxed">
          {currentWoman.contribuicao}
        </CardDescription>
        
        <div className="content-button-card-quiz">
          {options.map((option, index) => {
            // Place buttons in appropriate containers
            if (index === 0) {
              return (
                <div key={index} className="btn-button-quiz">
                  <Button 
                    className="button-card-quiz bg-[#E1C8F4]"
                    onClick={() => handleAnswer(option.isCorrect, option.name)}
                  >
                    {option.name}
                  </Button>
                  {options[1] && (
                    <div className="btn-content-2">
                      <Button 
                        className="button-card-quiz bg-[#E1C8F4]"
                        onClick={() => handleAnswer(options[1].isCorrect, options[1].name)}
                      >
                        {options[1].name}
                      </Button>
                    </div>
                  )}
                </div>
              );
            } else if (index === 2) {
              return (
                <div key={index} className="btn-button-quiz">
                  <Button 
                    className="button-card-quiz bg-[#E1C8F4]"
                    onClick={() => handleAnswer(option.isCorrect, option.name)}
                  >
                    {option.name}
                  </Button>
                  {options[3] && (
                    <div className="btn-content-2">
                      <Button 
                        className="button-card-quiz bg-[#E1C8F4]"
                        onClick={() => handleAnswer(options[3].isCorrect, options[3].name)}
                      >
                        {options[3].name}
                      </Button>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
        
        <div className="mt-4 text-white text-center">
          <span className="font-bold">Acertos:</span> {acertos} | <span className="font-bold">Erros:</span> {erros}
        </div>
      </Card>
    </div>
  );
}