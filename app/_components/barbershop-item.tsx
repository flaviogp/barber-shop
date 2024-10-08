import { BarberShop } from "@prisma/client"
import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarberShopItemProps {
  barberShop: BarberShop
}

const BarbershopItem = ({ barberShop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* Image  */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            alt={barberShop.name}
            className="rounded-2xl object-cover"
            src={barberShop.imageUrl}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="teext-xs font-semibold">5.0</p>
          </Badge>
        </div>
        {/* Text  */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>
          <Button asChild variant="secondary" className="mt-3 w-full">
            <Link href={`barbershops/${barberShop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
