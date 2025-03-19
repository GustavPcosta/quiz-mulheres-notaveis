"use client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Logo from '../../../public/Logo.svg';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./index.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/Api/api";
export default function CartdHome() {
   const [women, setWomen] = useState([])

   async function LoadWomen(){
    try {
        const response = await api.get('/women')
        console.log(response.data)
        setWomen(response.data)
    } catch (error) {
        console.log(error)
    }
    
   }
   
   useEffect(()=>{
    LoadWomen()
   },[])

    return (
        <div className="content-cards">
            <Card className="body-card">
                <Image src={Logo} alt="Logo" />
                <CardTitle className="card-title text-[#ffff] font-bold text-[30px] text-center">
                    Quiz: Mulheres notáveis
                </CardTitle>
                    <CardDescription className=" text-[#ffff] font-light text-[20px] text-center">
                    Teste seus conhecimentos sobre mulheres que fizeram história
                    </CardDescription>
               
                <Button  className="button-card bg-[#E1C8F4]"> <Link href={"/quiz-content"}>Iniciar quiz</Link></Button>
            </Card>
        </div>
    );
}
