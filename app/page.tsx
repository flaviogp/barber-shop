import React from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

const page = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Flavio</h2>
        <p>Quinta feira, 19 de setembro</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full"></div>
        <Image
          src="/banner-01.png"
          alt="Agende com os melhores"
          fill
          className="rounded-xl object-contain"
        />
      </div>
    </div>
  )
}

export default page
