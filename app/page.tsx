import React from "react"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"

const Home = async () => {
  const barberShops = await db.barberShop.findMany({})
  const populaBarberShops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">Olá, Flavio</h2>
        <p>Quinta feira, 19 de setembro</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca rápida  */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              />
              <p className="capitalize">{option.title}</p>
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende com os melhores"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* Agendamento */}
        <BookingItem />
        {/* Recomendados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarbershopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>

        {/* Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {populaBarberShops.map((barberShop) => (
            <BarbershopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>
      </div>

      {/* Footer  */}
      <footer>
        <Card>
          <CardContent className="px-5 py-6 text-center">
            <p className="text-sm text-gray-400">
              Projeto FSW, com alterações feitas por Flavio Gomes
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
