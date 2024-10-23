import Phoneitem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

interface BarberShopPageProp {
  params: { id: string }
}

const BarberShopPage = async ({ params }: BarberShopPageProp) => {
  const barberShop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barberShop) return notFound()

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barberShop?.name}
          src={barberShop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          asChild
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* Informação  */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barberShop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barberShop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (499 avaliações)</p>
        </div>
      </div>

      {/* Descrição  */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barberShop?.description}</p>
      </div>

      {/* Services */}

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barberShop.services.map((service) => (
            <ServiceItem
              service={service}
              key={service.id}
              barberShop={barberShop}
            />
          ))}
        </div>
      </div>

      {/* Contatos */}
      <div className="space-y-3 border-b border-solid p-5">
        {barberShop.phones.map((phone) => (
          <Phoneitem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarberShopPage
