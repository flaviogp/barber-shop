import { BarberShopService } from "@prisma/client"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarberShopService
}

function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image  */}
        <div className="max'-w-[110px] relative max-h-[110px] min-h-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={service.name}
          />
        </div>

        {/* Right  */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          {/* Price & Button  */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
